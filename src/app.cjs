const React = require("react");
const { createRoot } = require("react-dom/client");
const {
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  ExternalLink,
  Factory: FactoryIcon,
  FileText,
  Filter,
  Focus,
  Languages,
  Layers3,
  Maximize2,
  Network,
  Package,
  Route,
  Search,
  ShieldCheck,
  X,
  ZoomIn,
  ZoomOut,
} = require("lucide-react");
const { nodes, edges, sources, audits } = require("./data.cjs");

const h = React.createElement;
const { useEffect, useMemo, useRef, useState } = React;

const ui = {
  en: {
    appName: "Carbon Evidence Graph",
    dataset: "NMC111 academic baseline",
    product: "Product LCA",
    factory: "Factory scopes",
    supply: "Supply chain",
    review: "Review queue",
    sources: "Sources",
    search: "Search nodes",
    filters: "Layers",
    bom: "Precursor inventory",
    scenarios: "Research scenarios",
    ai: "AI control workflow",
    missing: "Missing-data nodes",
    legend: "Data status",
    academic: "Academic value",
    mixed: "Mixed evidence",
    missingStatus: "Primary data missing",
    framework: "Framework node",
    illustrative: "Illustrative only",
    scenario: "Academic scenario",
    graphStatus: "Graph status",
    nodes: "nodes",
    links: "relationships",
    openChecks: "open checks",
    inspector: "Node record",
    productValue: "Product context",
    factoryValue: "Factory context",
    boundary: "Stage / boundary",
    scope: "Scope mapping",
    quality: "Data quality",
    provenance: "Provenance class",
    allocation: "Allocation rule",
    evidence: "Evidence",
    aiReview: "AI review note",
    noSelection: "Select a node",
    high: "High",
    medium: "Medium",
    action: "Required action",
    locate: "Locate node",
    close: "Close",
    external: "Open source",
    localFile: "Local evidence file",
    fit: "Fit graph",
    focus: "Focus selected node",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    export: "Export visible graph as JSON",
    language: "Switch language",
    filter: "Open layers",
    boundaryLine: "Product LCA and factory Scope totals are linked, never directly added.",
    academicSummary: "145.69 kg CO2e/kWh",
    academicSummaryLabel: "Product baseline",
    plantSummary: "Not calculated",
    plantSummaryLabel: "Factory inventory",
    evidenceSummary: "Academic + missing primary",
    evidenceSummaryLabel: "Evidence state",
    supplySummary: "0 verified",
    supplySummaryLabel: "Supplier PCFs",
    methodNote: "Functional unit: 1 kWh storage capacity. Boundary: cradle-to-gate.",
    visibleGraph: "Visible graph",
    selectHint: "No numerical value is inferred from a missing node.",
  },
  zh: {
    appName: "碳排放证据图谱",
    dataset: "NMC111学术基准",
    product: "产品LCA",
    factory: "工厂Scope",
    supply: "供应链",
    review: "审计队列",
    sources: "资料来源",
    search: "搜索节点",
    filters: "图层",
    bom: "前驱体清单",
    scenarios: "研究情景",
    ai: "AI受控工作流",
    missing: "缺失数据节点",
    legend: "数据状态",
    academic: "学术数据",
    mixed: "混合证据",
    missingStatus: "一级数据缺失",
    framework: "框架节点",
    illustrative: "仅作演示",
    scenario: "学术情景",
    graphStatus: "图谱状态",
    nodes: "个节点",
    links: "条关系",
    openChecks: "项待审核",
    inspector: "节点记录",
    productValue: "产品维度",
    factoryValue: "工厂维度",
    boundary: "阶段/边界",
    scope: "Scope映射",
    quality: "数据质量",
    provenance: "来源追溯类型",
    allocation: "分配规则",
    evidence: "证据",
    aiReview: "AI审核提示",
    noSelection: "请选择节点",
    high: "高",
    medium: "中",
    action: "所需行动",
    locate: "定位节点",
    close: "关闭",
    external: "打开来源",
    localFile: "本地证据文件",
    fit: "适应画布",
    focus: "聚焦所选节点",
    zoomIn: "放大",
    zoomOut: "缩小",
    export: "导出当前图谱JSON",
    language: "切换语言",
    filter: "打开图层",
    boundaryLine: "产品LCA与工厂Scope总量仅建立关联，绝不直接相加。",
    academicSummary: "145.69 kg CO2e/kWh",
    academicSummaryLabel: "产品基准",
    plantSummary: "尚未计算",
    plantSummaryLabel: "工厂盘查",
    evidenceSummary: "学术数据 + 一级数据缺失",
    evidenceSummaryLabel: "证据状态",
    supplySummary: "0项经核验",
    supplySummaryLabel: "供应商PCF",
    methodNote: "功能单位：1 kWh储能容量。边界：摇篮到大门。",
    visibleGraph: "当前图谱",
    selectHint: "系统不会根据缺失节点推算数值。",
  },
};

const modeRoots = { product: "nmc111", factory: "factory", supply: "factory" };
const tr = (value, lang) => {
  if (value && typeof value === "object" && (value.en || value.zh)) return value[lang] || value.en;
  return value || "-";
};

const statusConfig = {
  academic: { key: "academic", color: "#0b8175" },
  mixed: { key: "mixed", color: "#c48616" },
  missing: { key: "missingStatus", color: "#c64b43" },
  framework: { key: "framework", color: "#4778b5" },
  illustrative: { key: "illustrative", color: "#747b78" },
  scenario: { key: "scenario", color: "#5f7e42" },
  ai: { key: "framework", color: "#7256a5" },
};

function IconButton({ icon: Icon, label, onClick, active, className = "", testId }) {
  return h(
    "button",
    {
      type: "button",
      className: `icon-button ${active ? "is-active" : ""} ${className}`,
      title: label,
      "aria-label": label,
      "data-testid": testId,
      onClick,
    },
    h(Icon, { size: 18, strokeWidth: 1.8 })
  );
}

function ModeTabs({ mode, setMode, labels }) {
  const entries = [
    ["product", Package, labels.product],
    ["factory", FactoryIcon, labels.factory],
    ["supply", Route, labels.supply],
  ];

  return h(
    "div",
    { className: "mode-tabs", role: "tablist", "aria-label": "Graph view" },
    entries.map(([id, Icon, label]) =>
      h(
        "button",
        {
          key: id,
          type: "button",
          role: "tab",
          "aria-selected": mode === id,
          className: mode === id ? "is-active" : "",
          onClick: () => setMode(id),
        },
        h(Icon, { size: 16, strokeWidth: 1.8 }),
        h("span", null, label)
      )
    )
  );
}

function SummaryRows({ mode, labels }) {
  const rows =
    mode === "product"
      ? [
          [labels.academicSummaryLabel, labels.academicSummary],
          [labels.evidenceSummaryLabel, labels.evidenceSummary],
          [labels.plantSummaryLabel, labels.plantSummary],
        ]
      : mode === "factory"
        ? [
            [labels.plantSummaryLabel, labels.plantSummary],
            [labels.evidenceSummaryLabel, labels.evidenceSummary],
            [labels.academicSummaryLabel, labels.academicSummary],
          ]
        : [
            [labels.supplySummaryLabel, labels.supplySummary],
            [labels.evidenceSummaryLabel, labels.evidenceSummary],
            [labels.academicSummaryLabel, labels.academicSummary],
          ];

  return h(
    "div",
    { className: "summary-rows" },
    rows.map(([label, value]) =>
      h(
        "div",
        { className: "summary-row", key: label },
        h("span", null, label),
        h("strong", null, value)
      )
    )
  );
}

function FilterToggle({ checked, onChange, label }) {
  return h(
    "label",
    { className: "filter-toggle" },
    h("input", { type: "checkbox", checked, onChange }),
    h("span", { className: "toggle-track", "aria-hidden": "true" }, h("span", null)),
    h("span", { className: "toggle-label" }, label)
  );
}

function Sidebar({
  open,
  close,
  labels,
  lang,
  mode,
  search,
  setSearch,
  filters,
  setFilters,
}) {
  const legends = ["academic", "mixed", "missing", "framework", "illustrative", "scenario"];
  return h(
    "aside",
    { className: `left-sidebar ${open ? "is-open" : ""}` },
    h(
      "div",
      { className: "mobile-panel-header" },
      h("strong", null, labels.filters),
      h(IconButton, { icon: X, label: labels.close, onClick: close })
    ),
    h(
      "div",
      { className: "sidebar-section search-section" },
      h(
        "label",
        { className: "search-box" },
        h(Search, { size: 17, strokeWidth: 1.8 }),
        h("input", {
          type: "search",
          value: search,
          placeholder: labels.search,
          onChange: (event) => setSearch(event.target.value),
        }),
        search
          ? h(IconButton, {
              icon: X,
              label: labels.close,
              className: "clear-search",
              onClick: () => setSearch(""),
            })
          : null
      )
    ),
    h(
      "div",
      { className: "sidebar-section" },
      h("div", { className: "section-label" }, labels.graphStatus),
      h(SummaryRows, { mode, labels }),
      h("p", { className: "method-note" }, labels.methodNote)
    ),
    h(
      "div",
      { className: "sidebar-section" },
      h("div", { className: "section-label" }, labels.filters),
      h(FilterToggle, {
        checked: filters.bom,
        label: labels.bom,
        onChange: () => setFilters((current) => ({ ...current, bom: !current.bom })),
      }),
      h(FilterToggle, {
        checked: filters.scenario,
        label: labels.scenarios,
        onChange: () => setFilters((current) => ({ ...current, scenario: !current.scenario })),
      }),
      h(FilterToggle, {
        checked: filters.ai,
        label: labels.ai,
        onChange: () => setFilters((current) => ({ ...current, ai: !current.ai })),
      }),
      h(FilterToggle, {
        checked: filters.missing,
        label: labels.missing,
        onChange: () => setFilters((current) => ({ ...current, missing: !current.missing })),
      })
    ),
    h(
      "div",
      { className: "sidebar-section legend-section" },
      h("div", { className: "section-label" }, labels.legend),
      legends.map((status) => {
        const config = statusConfig[status];
        return h(
          "div",
          { className: "legend-row", key: status },
          h("span", { className: "legend-swatch", style: { backgroundColor: config.color } }),
          h("span", null, labels[config.key])
        );
      })
    )
  );
}

function buildElements(mode, filters, lang) {
  const visibleNodes = nodes.filter((node) => {
    if (!node.views.includes(mode)) return false;
    if (node.flags?.includes("bom") && !filters.bom) return false;
    if (node.flags?.includes("scenario") && !filters.scenario) return false;
    if (node.flags?.includes("ai") && !filters.ai) return false;
    if (node.status === "missing" && !filters.missing && node.id !== modeRoots[mode]) return false;
    return true;
  });
  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = edges.filter((item) => {
    if (!item.views.includes(mode)) return false;
    if (item.flags?.includes("bom") && !filters.bom) return false;
    if (item.flags?.includes("scenario") && !filters.scenario) return false;
    if (item.flags?.includes("ai") && !filters.ai) return false;
    return visibleIds.has(item.source) && visibleIds.has(item.target);
  });

  return {
    nodes: visibleNodes.map((node) => ({
      data: {
        id: node.id,
        label: tr(node.name, lang),
        type: node.type,
        status: node.status,
        emission: node.emission || 0,
        flags: (node.flags || []).join(" "),
      },
      position: node.positions[mode],
    })),
    edges: visibleEdges.map((item) => ({
      data: {
        id: item.id,
        source: item.source,
        target: item.target,
        relation: tr(item.relation, lang),
        flags: (item.flags || []).join(" "),
      },
    })),
  };
}

function cytoscapeStyle() {
  const nodeColors = {
    product: "#18201d",
    factory: "#1e5149",
    component: "#0b8175",
    stage: "#4778b5",
    energy: "#d29a22",
    material: "#8a744f",
    scope: "#4778b5",
    activity: "#78827d",
    organization: "#4e7068",
    standard: "#4778b5",
    scenario: "#5f7e42",
    process: "#7256a5",
  };
  const shapes = {
    product: "round-rectangle",
    factory: "round-rectangle",
    component: "ellipse",
    stage: "round-rectangle",
    energy: "diamond",
    material: "ellipse",
    scope: "hexagon",
    activity: "ellipse",
    organization: "round-rectangle",
    standard: "round-rectangle",
    scenario: "round-rectangle",
    process: "round-rectangle",
  };

  return [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "font-family": "Inter, Segoe UI, Microsoft YaHei, sans-serif",
        "font-size": 11,
        "font-weight": 600,
        color: "#1a211e",
        "text-wrap": "wrap",
        "text-max-width": 108,
        "text-valign": "bottom",
        "text-margin-y": 10,
        "background-color": (element) => nodeColors[element.data("type")] || "#747b78",
        shape: (element) => shapes[element.data("type")] || "ellipse",
        width: (element) => {
          const type = element.data("type");
          if (type === "product") return 86;
          if (type === "factory") return 82;
          if (type === "scope") return 72;
          if (type === "stage") return 68;
          if (type === "process") return 58;
          const emission = Number(element.data("emission") || 0);
          return Math.min(78, 42 + Math.sqrt(emission) * 2.5);
        },
        height: (element) => {
          const type = element.data("type");
          if (type === "product") return 58;
          if (type === "factory") return 56;
          if (type === "stage") return 48;
          if (type === "process") return 46;
          return element.style("width");
        },
        "border-width": 3,
        "border-color": "#ffffff",
        "overlay-opacity": 0,
        "transition-property": "opacity, border-width, border-color, background-color",
        "transition-duration": "180ms",
      },
    },
    {
      selector: 'node[status = "missing"]',
      style: {
        "background-color": "#ffffff",
        "border-color": "#c64b43",
        "border-style": "dashed",
        color: "#632b28",
      },
    },
    {
      selector: 'node[status = "mixed"]',
      style: { "border-color": "#c48616", "border-width": 5 },
    },
    {
      selector: 'node[status = "illustrative"]',
      style: { "background-color": "#f4f5f2", "border-color": "#747b78", color: "#535a57" },
    },
    {
      selector: 'node[status = "scenario"]',
      style: { "background-color": "#5f7e42", "border-color": "#dfe9d6" },
    },
    {
      selector: "edge",
      style: {
        width: 1.6,
        "line-color": "#aeb8b3",
        "target-arrow-color": "#89938e",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        label: "data(relation)",
        "font-family": "Inter, Segoe UI, Microsoft YaHei, sans-serif",
        "font-size": 8,
        color: "#5c6561",
        "text-background-color": "#f6f7f4",
        "text-background-opacity": 0,
        "text-background-padding": 3,
        "text-opacity": 0,
        "arrow-scale": 0.75,
        opacity: 0.85,
        "transition-property": "opacity, line-color, width, text-opacity",
        "transition-duration": "180ms",
      },
    },
    {
      selector: 'edge[flags *= "ai"]',
      style: { "line-style": "dashed", "line-color": "#9079b6", "target-arrow-color": "#7256a5" },
    },
    {
      selector: 'edge[flags *= "scenario"]',
      style: { "line-style": "dashed", "line-color": "#86a56e", "target-arrow-color": "#5f7e42" },
    },
    {
      selector: ".is-dimmed",
      style: { opacity: 0.13, "text-opacity": 0 },
    },
    {
      selector: "node.is-neighbor",
      style: { "border-color": "#1b2521", "border-width": 4 },
    },
    {
      selector: "edge.is-neighbor",
      style: { "line-color": "#38423e", "target-arrow-color": "#38423e", width: 2.7, "text-opacity": 1, "text-background-opacity": 0.93 },
    },
    {
      selector: "node.is-selected",
      style: { "border-color": "#f2b84b", "border-width": 6, "z-index": 20 },
    },
    {
      selector: "node.search-match",
      style: { "border-color": "#1f6fb2", "border-width": 6 },
    },
  ];
}

function GraphCanvas({
  mode,
  filters,
  lang,
  labels,
  search,
  selectedId,
  setSelectedId,
  setInspectorOpen,
  graphApi,
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const elements = useMemo(() => buildElements(mode, filters, lang), [mode, filters, lang]);

  useEffect(() => {
    if (!containerRef.current || !window.cytoscape) return undefined;
    if (cyRef.current) cyRef.current.destroy();
    const cy = window.cytoscape({
      container: containerRef.current,
      elements,
      style: cytoscapeStyle(),
      layout: { name: "preset", fit: true, padding: 52 },
      minZoom: 0.3,
      maxZoom: 2.6,
      wheelSensitivity: 0.18,
      boxSelectionEnabled: false,
    });
    cyRef.current = cy;
    graphApi.current = cy;
    window.__carbonGraph = cy;
    cy.on("tap", "node", (event) => {
      const id = event.target.id();
      setSelectedId(id);
      setInspectorOpen(true);
    });
    cy.on("tap", (event) => {
      if (event.target === cy) setSelectedId(modeRoots[mode]);
    });
    requestAnimationFrame(() => cy.fit(undefined, 52));
    return () => {
      if (window.__carbonGraph === cy) delete window.__carbonGraph;
      cy.destroy();
    };
  }, [elements, mode, graphApi, setInspectorOpen, setSelectedId]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass("is-selected is-neighbor is-dimmed");
    const selected = cy.getElementById(selectedId);
    if (!selected.length) return;
    const neighborhood = selected.closedNeighborhood();
    if (selectedId !== modeRoots[mode]) {
      cy.elements().not(neighborhood).addClass("is-dimmed");
    }
    neighborhood.addClass("is-neighbor");
    selected.addClass("is-selected");
  }, [selectedId, elements, mode]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.nodes().removeClass("search-match");
    const query = search.trim().toLocaleLowerCase();
    if (!query) return;
    cy.nodes().forEach((node) => {
      if (String(node.data("label")).toLocaleLowerCase().includes(query)) node.addClass("search-match");
    });
  }, [search, elements]);

  const zoom = (factor) => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({ level: Math.min(2.6, Math.max(0.3, cy.zoom() * factor)), renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };
  const fit = () => cyRef.current?.fit(undefined, 52);
  const focus = () => {
    const cy = cyRef.current;
    const node = cy?.getElementById(selectedId);
    if (node?.length) {
      cy.animate({ center: { eles: node }, zoom: 1.2 }, { duration: 280 });
    }
  };
  const exportGraph = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      view: mode,
      boundaryNotice: labels.boundaryLine,
      nodes: elements.nodes.map((item) => item.data),
      relationships: elements.edges.map((item) => item.data),
    };
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    link.download = `battery-carbon-graph-${mode}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return h(
    "main",
    { className: "graph-stage" },
    h(
      "div",
      { className: "boundary-banner" },
      h(ShieldCheck, { size: 16, strokeWidth: 1.8 }),
      h("span", null, labels.boundaryLine)
    ),
    h("div", { ref: containerRef, className: "graph-canvas", "data-testid": "graph-canvas" }),
    h(
      "div",
      { className: "graph-toolbar" },
      h(IconButton, { icon: ZoomIn, label: labels.zoomIn, onClick: () => zoom(1.22), testId: "zoom-in" }),
      h(IconButton, { icon: ZoomOut, label: labels.zoomOut, onClick: () => zoom(0.82), testId: "zoom-out" }),
      h(IconButton, { icon: Maximize2, label: labels.fit, onClick: fit, testId: "fit-graph" }),
      h(IconButton, { icon: Focus, label: labels.focus, onClick: focus, testId: "focus-node" }),
      h("span", { className: "toolbar-divider" }),
      h(IconButton, { icon: Download, label: labels.export, onClick: exportGraph, testId: "export-graph" })
    ),
    h(
      "div",
      { className: "graph-count" },
      h("strong", null, elements.nodes.length),
      ` ${labels.nodes}  /  `,
      h("strong", null, elements.edges.length),
      ` ${labels.links}`
    )
  );
}

function Inspector({ node, open, close, labels, lang }) {
  if (!node) return null;
  const config = statusConfig[node.status] || statusConfig.framework;
  return h(
    "aside",
    { className: `inspector ${open ? "is-open" : ""}` },
    h(
      "div",
      { className: "inspector-header" },
      h("div", null, h("span", { className: "eyebrow" }, labels.inspector), h("h2", null, tr(node.name, lang))),
      h(IconButton, { icon: X, label: labels.close, onClick: close, className: "inspector-close" })
    ),
    h(
      "div",
      { className: "status-line" },
      h("span", { className: "status-dot", style: { backgroundColor: config.color } }),
      h("strong", null, labels[config.key]),
      h("span", null, tr(node.subtitle, lang))
    ),
    h("p", { className: "node-description" }, tr(node.description, lang)),
    h(
      "div",
      { className: "value-pair" },
      h("div", null, h("span", null, labels.productValue), h("strong", null, tr(node.productValue, lang))),
      h("div", null, h("span", null, labels.factoryValue), h("strong", null, tr(node.factoryValue, lang)))
    ),
    h(
      "dl",
      { className: "metadata-list" },
      h("div", null, h("dt", null, labels.boundary), h("dd", null, tr(node.stage, lang))),
      h("div", null, h("dt", null, labels.scope), h("dd", null, tr(node.scope, lang))),
      h("div", null, h("dt", null, labels.quality), h("dd", null, tr(node.quality, lang))),
      h("div", null, h("dt", null, labels.provenance), h("dd", null, node.provenance || "-")),
      h("div", null, h("dt", null, labels.allocation), h("dd", null, tr(node.allocation, lang)))
    ),
    h(
      "section",
      { className: "inspector-section evidence-section" },
      h("h3", null, h(FileText, { size: 16 }), labels.evidence),
      h("p", null, tr(node.sourceNote, lang)),
      (node.sourceIds || []).map((sourceId) =>
        h("div", { className: "source-inline", key: sourceId }, h(Database, { size: 14 }), tr(sources[sourceId]?.title, lang))
      )
    ),
    h(
      "section",
      { className: "inspector-section ai-note" },
      h("h3", null, h(BrainCircuit, { size: 16 }), labels.aiReview),
      h("p", null, tr(node.ai, lang))
    )
  );
}

function AuditDialog({ open, close, labels, lang, locate }) {
  if (!open) return null;
  return h(
    "div",
    { className: "modal-backdrop", role: "presentation", onMouseDown: (event) => event.target === event.currentTarget && close() },
    h(
      "section",
      { className: "modal audit-modal", role: "dialog", "aria-modal": "true", "aria-label": labels.review },
      h(
        "header",
        null,
        h("div", null, h("span", { className: "eyebrow" }, `${audits.length} ${labels.openChecks}`), h("h2", null, labels.review)),
        h(IconButton, { icon: X, label: labels.close, onClick: close })
      ),
      h(
        "div",
        { className: "audit-list" },
        audits.map((item) =>
          h(
            "article",
            { className: "audit-item", key: item.id },
            h(
              "div",
              { className: `severity severity-${item.severity}` },
              h(AlertTriangle, { size: 15 }),
              labels[item.severity]
            ),
            h("div", { className: "audit-copy" }, h("h3", null, tr(item.title, lang)), h("p", null, tr(item.detail, lang)), h("strong", null, labels.action), h("p", null, tr(item.action, lang))),
            h(
              "button",
              { type: "button", className: "locate-button", onClick: () => locate(item.nodeId) },
              labels.locate,
              h(ChevronRight, { size: 16 })
            )
          )
        )
      )
    )
  );
}

function SourcesDialog({ open, close, labels, lang }) {
  if (!open) return null;
  return h(
    "div",
    { className: "modal-backdrop", role: "presentation", onMouseDown: (event) => event.target === event.currentTarget && close() },
    h(
      "section",
      { className: "modal sources-modal", role: "dialog", "aria-modal": "true", "aria-label": labels.sources },
      h(
        "header",
        null,
        h("div", null, h("span", { className: "eyebrow" }, "Evidence register"), h("h2", null, labels.sources)),
        h(IconButton, { icon: X, label: labels.close, onClick: close })
      ),
      h(
        "div",
        { className: "source-list" },
        Object.entries(sources).map(([id, source]) =>
          h(
            "article",
            { className: "source-record", key: id },
            h("div", { className: "source-icon" }, source.url ? h(BookOpen, { size: 18 }) : h(FileText, { size: 18 })),
            h(
              "div",
              null,
              h("h3", null, tr(source.title, lang)),
              h("p", null, tr(source.detail, lang)),
              source.citation ? h("p", { className: "source-citation" }, tr(source.citation, lang)) : null
            ),
            source.url
              ? h(
                  "a",
                  { href: source.url, target: "_blank", rel: "noreferrer", title: labels.external },
                  h(ExternalLink, { size: 17 }),
                  h("span", null, labels.external)
                )
              : h("span", { className: "local-label" }, lang === "zh" ? "来源说明" : "Source note")
          )
        )
      )
    )
  );
}

function App() {
  const [lang, setLang] = useState("en");
  const [mode, setModeState] = useState("product");
  const [selectedId, setSelectedId] = useState("nmc111");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ bom: false, scenario: false, ai: true, missing: true });
  const [leftOpen, setLeftOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [auditOpen, setAuditOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const graphApi = useRef(null);
  const labels = ui[lang];
  const selectedNode = nodes.find((node) => node.id === selectedId) || nodes.find((node) => node.id === modeRoots[mode]);

  const setMode = (nextMode) => {
    setModeState(nextMode);
    setSelectedId(modeRoots[nextMode]);
    setSearch("");
  };

  const locateNode = (nodeId) => {
    const node = nodes.find((candidate) => candidate.id === nodeId);
    if (!node) return;
    const preferredMode = node.views.includes(mode) ? mode : node.views[0];
    setModeState(preferredMode);
    setSelectedId(nodeId);
    setAuditOpen(false);
    setInspectorOpen(true);
    if (node.flags?.includes("bom")) setFilters((current) => ({ ...current, bom: true }));
    if (node.flags?.includes("scenario")) setFilters((current) => ({ ...current, scenario: true }));
  };

  return h(
    "div",
    { className: "app-shell" },
    h(
      "header",
      { className: "topbar" },
      h(
        "div",
        { className: "brand-block" },
        h("div", { className: "brand-mark", "aria-hidden": "true" }, h(Network, { size: 21, strokeWidth: 1.9 })),
        h("div", null, h("strong", null, labels.appName), h("span", null, labels.dataset))
      ),
      h(ModeTabs, { mode, setMode, labels }),
      h(
        "div",
        { className: "top-actions" },
        h(IconButton, { icon: Filter, label: labels.filter, onClick: () => setLeftOpen(true), className: "mobile-filter" }),
        h(
          "button",
          { type: "button", className: "command-button", onClick: () => setAuditOpen(true) },
          h(BrainCircuit, { size: 17 }),
          h("span", null, labels.review),
          h("b", null, audits.length)
        ),
        h(IconButton, { icon: BookOpen, label: labels.sources, onClick: () => setSourcesOpen(true) }),
        h(IconButton, { icon: Languages, label: labels.language, onClick: () => setLang((current) => (current === "en" ? "zh" : "en")) })
      )
    ),
    h(
      "div",
      { className: "workspace" },
      h(Sidebar, {
        open: leftOpen,
        close: () => setLeftOpen(false),
        labels,
        lang,
        mode,
        search,
        setSearch,
        filters,
        setFilters,
      }),
      h(GraphCanvas, {
        mode,
        filters,
        lang,
        labels,
        search,
        selectedId,
        setSelectedId,
        setInspectorOpen,
        graphApi,
      }),
      h(Inspector, { node: selectedNode, open: inspectorOpen, close: () => setInspectorOpen(false), labels, lang })
    ),
    !inspectorOpen
      ? h(
          "button",
          { type: "button", className: "reopen-inspector", title: labels.inspector, onClick: () => setInspectorOpen(true) },
          h(Layers3, { size: 18 }),
          h("span", null, labels.inspector)
        )
      : null,
    h(AuditDialog, { open: auditOpen, close: () => setAuditOpen(false), labels, lang, locate: locateNode }),
    h(SourcesDialog, { open: sourcesOpen, close: () => setSourcesOpen(false), labels, lang })
  );
}

const root = createRoot(document.getElementById("root"));
root.render(h(App));
