import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entryFile = path.join(projectRoot, "src", "app.cjs");
const outputDir = path.join(projectRoot, "dist");
const outputFile = path.join(outputDir, "app.bundle.js");
const nodeRequire = createRequire(import.meta.url);
const moduleIds = new Map();
const moduleBodies = [];

function resolveModule(request, fromFile) {
  if (request.startsWith(".")) {
    return nodeRequire.resolve(path.resolve(path.dirname(fromFile), request));
  }

  return nodeRequire.resolve(request, { paths: [path.dirname(fromFile), projectRoot] });
}

function addModule(filePath) {
  const normalized = path.normalize(filePath);
  if (moduleIds.has(normalized)) return moduleIds.get(normalized);

  const id = moduleBodies.length;
  moduleIds.set(normalized, id);
  moduleBodies.push("");

  if (normalized.endsWith(".json")) {
    const json = fs.readFileSync(normalized, "utf8");
    moduleBodies[id] = `module.exports = ${json.trim()};`;
    return id;
  }

  let code = fs.readFileSync(normalized, "utf8");
  code = code.replace(/require\(\s*(["'])([^"']+)\1\s*\)/g, (_match, _quote, request) => {
    const dependencyId = addModule(resolveModule(request, normalized));
    return `__require(${dependencyId})`;
  });

  if (/\brequire\s*\(/.test(code)) {
    throw new Error(`Unsupported dynamic require in ${normalized}`);
  }

  const sourceLabel = path.relative(projectRoot, normalized).replaceAll("\\", "/");
  moduleBodies[id] = `${code}\n//# sourceURL=${sourceLabel}`;
  return id;
}

const entryId = addModule(entryFile);
const moduleTable = moduleBodies
  .map((body, index) => `${index}: function(module, exports, __require, process) {\n${body}\n}`)
  .join(",\n");

const bundle = `(() => {
  "use strict";
  const process = { env: { NODE_ENV: "production" } };
  const modules = {
${moduleTable}
  };
  const cache = {};
  function __require(id) {
    if (cache[id]) return cache[id].exports;
    const module = { exports: {} };
    cache[id] = module;
    modules[id](module, module.exports, __require, process);
    return module.exports;
  }
  __require(${entryId});
})();
`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, bundle, "utf8");
console.log(`Built ${path.relative(projectRoot, outputFile)} (${Math.round(Buffer.byteLength(bundle) / 1024)} KB)`);
