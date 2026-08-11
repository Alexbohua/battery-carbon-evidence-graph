import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const playwrightPackage = process.env.PLAYWRIGHT_PACKAGE || "playwright";
const { chromium } = require(playwrightPackage);
const outputDir = process.argv[2] || path.join(process.env.TEMP || ".", "battery-carbon-graph-qa");
const url = process.argv[3] || "http://127.0.0.1:4173";

fs.mkdirSync(outputDir, { recursive: true });

const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined;
const browser = await chromium.launch({ headless: true, executablePath });
const errors = [];

async function inspectPage(page, label) {
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${label} console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${label} page: ${error.message}`));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__carbonGraph?.nodes().length > 0);
  return page.evaluate(() => ({
    nodes: window.__carbonGraph.nodes().length,
    edges: window.__carbonGraph.edges().length,
    canvases: document.querySelectorAll(".graph-canvas canvas").length,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    bodyHeight: document.body.scrollHeight,
    viewportHeight: window.innerHeight,
  }));
}

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const desktopInitial = await inspectPage(desktop, "desktop");
await desktop.screenshot({ path: path.join(outputDir, "desktop-product.png"), fullPage: true });
await desktop.getByRole("tab", { name: "Factory scopes" }).click();
await desktop.waitForFunction(() => window.__carbonGraph?.getElementById("scope1").length === 1);
const desktopFactory = await desktop.evaluate(() => ({
  nodes: window.__carbonGraph.nodes().length,
  edges: window.__carbonGraph.edges().length,
}));
await desktop.screenshot({ path: path.join(outputDir, "desktop-factory.png"), fullPage: true });
await desktop.getByRole("tab", { name: "Supply chain" }).click();
await desktop.waitForFunction(() => window.__carbonGraph?.getElementById("pact_exchange").length === 1);
const desktopSupply = await desktop.evaluate(() => ({
  nodes: window.__carbonGraph.nodes().length,
  edges: window.__carbonGraph.edges().length,
}));
await desktop.screenshot({ path: path.join(outputDir, "desktop-supply.png"), fullPage: true });
await desktop.getByRole("tab", { name: "Product LCA" }).click();
await desktop.getByText("Precursor inventory", { exact: true }).click();
await desktop.getByText("Research scenarios", { exact: true }).click();
await desktop.waitForFunction(() => window.__carbonGraph?.getElementById("reference_precursor").length === 1);
const desktopExpanded = await desktop.evaluate(() => ({
  nodes: window.__carbonGraph.nodes().length,
  edges: window.__carbonGraph.edges().length,
}));
await desktop.screenshot({ path: path.join(outputDir, "desktop-product-expanded.png"), fullPage: true });
await desktop.getByRole("button", { name: /Review queue/ }).click();
const auditItems = await desktop.locator(".audit-item").count();
await desktop.screenshot({ path: path.join(outputDir, "desktop-audit.png"), fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const mobileInitial = await inspectPage(mobile, "mobile");
await mobile.screenshot({ path: path.join(outputDir, "mobile-product.png"), fullPage: true });
await mobile.getByLabel("Close").last().click();
await mobile.waitForTimeout(260);
await mobile.screenshot({ path: path.join(outputDir, "mobile-graph.png"), fullPage: true });

await browser.close();

const result = {
  desktopInitial,
  desktopFactory,
  desktopSupply,
  desktopExpanded,
  mobileInitial,
  auditItems,
  errors,
  outputDir,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
if (desktopInitial.canvases === 0 || mobileInitial.canvases === 0) process.exitCode = 1;
if (desktopInitial.bodyWidth > desktopInitial.viewportWidth || mobileInitial.bodyWidth > mobileInitial.viewportWidth) process.exitCode = 1;
