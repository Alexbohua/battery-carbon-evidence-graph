const tx = (en, zh) => ({ en, zh });

const sources = {
  thesis: {
    title: tx(
      "Bohua Chen, Development and application of innovative methodology for eco-design sustainable batteries",
      "陈柏桦：可持续电池生态设计创新方法的开发与应用"
    ),
    detail: tx(
      "Academic NMC111 cradle-to-gate model; Activity Browser with ecoinvent 3.10. Relevant evidence: Tables 1-2, Figure 1, Section 2.1 and Figure 2.",
      "NMC111摇篮到大门学术模型；使用Activity Browser与ecoinvent 3.10。相关证据：表1-2、图1、第2.1节和图2。"
    ),
    citation: tx(
      "Academic source paper supplied by the project author; the original document is not redistributed in this repository.",
      "由项目作者提供的学术源论文；原始文档不随本仓库再分发。"
    ),
  },
  batteryStandard: {
    title: tx(
      "T/CQAE 12002-2024: Product carbon footprint for lithium-ion batteries",
      "T/CQAE 12002-2024：锂离子电池产品碳足迹量化方法与要求"
    ),
    detail: tx(
      "Defines battery life-cycle stages, primary-data expectations, allocation and cut-off requirements for consumer, small-motive and energy-storage batteries.",
      "规定消费型、小动力型和储能型锂电池的生命周期阶段、初级数据要求、分配和取舍规则。"
    ),
    url: "https://www.miit.gov.cn/cms_files/filemanager/1226211233/attach/20255/f1181bf1281046b399ed5fa241fd9129.pdf",
  },
  ghgProtocol: {
    title: tx("GHG Protocol Corporate Standard", "GHG Protocol企业核算与报告标准"),
    detail: tx(
      "Organization-level inventory framework for direct emissions, purchased energy and value-chain emissions.",
      "用于组织层面的直接排放、外购能源排放和价值链排放盘查。"
    ),
    url: "https://ghgprotocol.org/corporate-standard",
  },
  euBattery: {
    title: tx("EU Regulation 2023/1542 on batteries", "欧盟电池法规 2023/1542"),
    detail: tx(
      "Requires battery-model and manufacturing-plant-specific carbon footprint information for covered batteries and reporting by life-cycle stage.",
      "对适用电池要求按具体型号、具体制造工厂计算碳足迹，并按生命周期阶段披露。"
    ),
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1542",
  },
  pact: {
    title: tx("PACT Technical Specifications 3.0.3", "PACT产品碳足迹交换技术规范3.0.3"),
    detail: tx(
      "A current interoperable data model and API specification for exchanging product carbon footprint information across value chains.",
      "用于跨价值链交换产品碳足迹信息的互操作数据模型与API规范。"
    ),
    url: "https://docs.carbon-transparency.org/tr/data-exchange-protocol/latest/",
  },
  prov: {
    title: tx("W3C PROV-O provenance ontology", "W3C PROV-O来源追溯本体"),
    detail: tx(
      "Provides Entity, Activity and Agent concepts for traceable provenance relationships.",
      "提供Entity、Activity与Agent概念，用于建立可追溯的数据来源关系。"
    ),
    url: "https://www.w3.org/TR/prov-o/",
  },
};

const commonPositions = {
  aiEvidence: { x: 240, y: 700 },
  aiExtract: { x: 440, y: 700 },
  aiRules: { x: 640, y: 700 },
  aiHuman: { x: 840, y: 700 },
  aiEngine: { x: 1040, y: 700 },
};

const nodes = [
  {
    id: "nmc111",
    type: "product",
    views: ["product", "factory", "supply"],
    name: tx("NMC111 battery pack", "NMC111电池包"),
    subtitle: tx("Academic baseline", "学术基准模型"),
    description: tx(
      "Cradle-to-gate academic model for one kWh of NMC111 battery storage capacity. It is not a verified factory product carbon footprint.",
      "以1 kWh NMC111电池储能容量为功能单位的摇篮到大门学术模型，不是经核查的工厂产品碳足迹。"
    ),
    productValue: "145.69 kg CO2e/kWh",
    factoryValue: tx("Plant total not calculated", "工厂总量尚未计算"),
    stage: tx("Cradle-to-gate", "摇篮到大门"),
    scope: tx("Product system; not a Scope total", "产品系统；不是Scope总量"),
    status: "academic",
    quality: tx("Secondary academic model", "学术次级数据模型"),
    provenance: "Entity",
    sourceIds: ["thesis"],
    sourceNote: tx("Thesis Section 2.1 and Figure 2", "论文第2.1节与图2"),
    allocation: tx("Functional unit: 1 kWh storage capacity", "功能单位：1 kWh储能容量"),
    ai: tx(
      "Use as a reference model only. Replace with plant-specific BOM, yield, energy and logistics data before external reporting.",
      "仅作为参考模型。对外报告前需替换为特定工厂的BOM、良率、能源和物流数据。"
    ),
    emission: 145.69,
    positions: {
      product: { x: 640, y: 330 },
      factory: { x: 630, y: 550 },
      supply: { x: 820, y: 315 },
    },
  },
  {
    id: "factory",
    type: "factory",
    views: ["factory", "supply"],
    name: tx("Battery manufacturing plant", "电池制造工厂"),
    subtitle: tx("Demonstration boundary", "演示边界"),
    description: tx(
      "Organization boundary for a future annual Scope 1, 2 and 3 inventory. No plant primary activity data were supplied for this prototype.",
      "未来年度Scope 1、2、3盘查的组织边界。本原型尚未获得工厂一级活动数据。"
    ),
    productValue: tx("Manufactures NMC111 model", "生产NMC111模型"),
    factoryValue: tx("Awaiting annual activity data", "等待年度活动数据"),
    stage: tx("Manufacturing site", "制造场地"),
    scope: tx("Scope 1, 2 and 3 inventory", "Scope 1、2、3盘查"),
    status: "missing",
    quality: tx("Boundary defined; inventory incomplete", "边界已定义；清单未完成"),
    provenance: "Agent",
    sourceIds: ["ghgProtocol", "batteryStandard"],
    sourceNote: tx("Framework mapping only", "仅完成框架映射"),
    allocation: tx("Requires annual output and causal allocation drivers", "需要年度产量及因果分配参数"),
    ai: tx(
      "Request annual utility bills, meter hierarchy, production output, yield, waste manifests and supplier data.",
      "需收集年度能源账单、分表结构、产量、良率、废弃物联单和供应商数据。"
    ),
    positions: {
      factory: { x: 620, y: 330 },
      supply: { x: 600, y: 315 },
    },
  },
  {
    id: "raw_stage",
    type: "stage",
    views: ["product"],
    name: tx("Raw material acquisition", "原材料获取"),
    subtitle: tx("Life-cycle stage", "生命周期阶段"),
    description: tx(
      "Upstream extraction, refining, component production and transport to the battery plant.",
      "上游开采、精炼、部件生产及运输至电池工厂。"
    ),
    productValue: tx("Contains component burdens", "包含各组件环境负荷"),
    factoryValue: tx("Normally Scope 3 upstream", "通常对应Scope 3上游"),
    stage: tx("Raw materials", "原材料"),
    scope: tx("Scope 3 upstream for the plant", "对工厂通常为Scope 3上游"),
    status: "framework",
    quality: tx("Stage definition", "阶段定义"),
    provenance: "Activity",
    sourceIds: ["batteryStandard"],
    sourceNote: tx("T/CQAE 12002-2024, system boundary", "T/CQAE 12002-2024系统边界"),
    allocation: tx("Do not add separately to component results", "不要与组件结果重复相加"),
    ai: tx("Check supplier boundary and transport coverage.", "检查供应商边界及运输覆盖情况。"),
    positions: { product: { x: 390, y: 330 } },
  },
  {
    id: "manufacturing_stage",
    type: "stage",
    views: ["product"],
    name: tx("Battery manufacturing", "电池制造"),
    subtitle: tx("Life-cycle stage", "生命周期阶段"),
    description: tx(
      "Electrode production, assembly, formation, inspection and associated production utilities.",
      "极片制造、装配、化成、检验及相关生产公用工程。"
    ),
    productValue: tx("Energy inputs embedded in model", "模型已包含能源投入"),
    factoryValue: tx("Maps to Scope 1 and 2 activities", "映射至Scope 1和2活动"),
    stage: tx("Manufacturing", "制造"),
    scope: tx("Scope 1 and 2; selected Scope 3", "Scope 1、2及部分Scope 3"),
    status: "framework",
    quality: tx("Stage definition", "阶段定义"),
    provenance: "Activity",
    sourceIds: ["batteryStandard", "thesis"],
    sourceNote: tx("Thesis Figure 1; battery standard", "论文图1；锂电池标准"),
    allocation: tx("Requires process meters or causal allocation", "需要工序分表或因果分配"),
    ai: tx("Match utility records to process and reporting period.", "将能源记录映射到工序和报告周期。"),
    positions: { product: { x: 875, y: 330 } },
  },
  ...[
    ["cathode", "Cathode active material", "正极活性材料", 57.44, { x: 175, y: 125 }],
    ["aluminium", "Primary aluminium", "原生铝", 36.48, { x: 135, y: 270 }],
    ["separator", "Battery separator", "电池隔膜", 14.04, { x: 155, y: 420 }],
    ["other_materials", "Other materials", "其他材料", 37.72, { x: 250, y: 555 }],
  ].map(([id, en, zh, emission, position]) => ({
    id,
    type: "component",
    views: ["product", "supply"],
    name: tx(en, zh),
    subtitle: tx("Baseline component contribution", "基准组件贡献"),
    description: tx(
      "Component-level global warming contribution reported in the academic baseline model.",
      "学术基准模型报告的组件级全球变暖贡献。"
    ),
    productValue: `${emission.toFixed(2)} kg CO2e/kWh`,
    factoryValue: tx("Supplier primary data not supplied", "未提供供应商一级数据"),
    stage: tx("Raw material acquisition", "原材料获取"),
    scope: tx("Scope 3 upstream for the plant", "对工厂为Scope 3上游"),
    status: "academic",
    quality: tx("Academic secondary result", "学术次级结果"),
    provenance: "Entity",
    sourceIds: ["thesis"],
    sourceNote: tx("Thesis Figure 2a", "论文图2a"),
    allocation: tx("Included in the 145.69 total", "已包含在145.69总量中"),
    ai: tx(
      "Retrieve supplier-specific product footprint and verify boundary, geography, year and verification status.",
      "获取供应商特定产品碳足迹，并核验边界、地区、年份和核查状态。"
    ),
    emission,
    positions: {
      product: position,
      supply:
        id === "cathode"
          ? { x: 330, y: 110 }
          : id === "aluminium"
            ? { x: 330, y: 260 }
            : id === "separator"
              ? { x: 330, y: 430 }
              : { x: 470, y: 525 },
    },
  })),
  {
    id: "electricity",
    type: "energy",
    views: ["product", "factory", "supply"],
    name: tx("Purchased electricity", "外购电力"),
    subtitle: tx("Shared activity node", "共享活动节点"),
    description: tx(
      "The product model reports approximately 30 MJ of electricity input per kWh functional unit. Plant annual electricity and allocation evidence are not available.",
      "产品模型报告每kWh功能单位约30 MJ电力投入；工厂年度用电及分配证据尚未提供。"
    ),
    productValue: "30 MJ/kWh = 8.33 kWh/kWh",
    factoryValue: tx("Awaiting utility bills and meter data", "等待电费单与分表数据"),
    stage: tx("Manufacturing input", "制造投入"),
    scope: tx("Scope 2 for plant; manufacturing input for product", "对工厂为Scope 2；对产品为制造投入"),
    status: "mixed",
    quality: tx("Academic product value; missing plant primary data", "产品学术值；缺少工厂一级数据"),
    provenance: "Activity",
    sourceIds: ["thesis", "ghgProtocol"],
    sourceNote: tx("Thesis Section 2.1; GHG Protocol Scope 2", "论文第2.1节；GHG Protocol Scope 2"),
    allocation: tx("Product input is not a separate add-on to component GWP", "产品能源投入不可与组件GWP重复相加"),
    ai: tx(
      "Extract annual bills and meter hierarchy, then ask for a causal allocation driver such as process kWh or machine-hours.",
      "提取年度账单和分表结构，再追问工序电量或设备工时等因果分配参数。"
    ),
    positions: {
      product: { x: 1020, y: 185 },
      factory: { x: 610, y: 155 },
      supply: { x: 335, y: 585 },
    },
  },
  {
    id: "natural_gas",
    type: "energy",
    views: ["product", "factory"],
    name: tx("Natural gas", "天然气"),
    subtitle: tx("Direct fuel activity", "直接燃料活动"),
    description: tx(
      "The academic model reports approximately 140 MJ natural gas per kWh functional unit. The reference precursor inventory separately reports 0.0386 mmBtu per kg precursor.",
      "学术模型报告每kWh功能单位约140 MJ天然气；基准前驱体清单另列每kg前驱体0.0386 mmBtu。"
    ),
    productValue: "~140 MJ/kWh",
    factoryValue: tx("Awaiting fuel invoices or meter data", "等待燃料账单或计量数据"),
    stage: tx("Manufacturing input", "制造投入"),
    scope: tx("Scope 1 for plant combustion", "工厂燃烧属于Scope 1"),
    status: "mixed",
    quality: tx("Academic product value; missing plant primary data", "产品学术值；缺少工厂一级数据"),
    provenance: "Activity",
    sourceIds: ["thesis", "ghgProtocol"],
    sourceNote: tx("Thesis Table 1 and Section 2.1", "论文表1与第2.1节"),
    allocation: tx("Separate plant fuel use from precursor upstream fuel", "区分厂内燃料与前驱体上游燃料"),
    ai: tx("Check meter boundary, combustion site and double counting.", "检查计量边界、燃烧地点及重复计算。"),
    positions: {
      product: { x: 1020, y: 435 },
      factory: { x: 350, y: 170 },
    },
  },
  {
    id: "reference_precursor",
    type: "component",
    views: ["product"],
    flags: ["bom"],
    name: tx("Reference NMC precursor", "基准NMC前驱体"),
    subtitle: tx("1 kg inventory", "1 kg清单"),
    description: tx(
      "Conventional sulfate-route precursor inventory reported in the thesis.",
      "论文报告的传统硫酸盐路线前驱体清单。"
    ),
    productValue: tx("Input quantities available", "投入数量可用"),
    factoryValue: tx("Supplier and plant not identified", "未识别供应商与工厂"),
    stage: tx("Cathode upstream", "正极上游"),
    scope: tx("Scope 3 upstream", "Scope 3上游"),
    status: "academic",
    quality: tx("Literature-based foreground inventory", "基于文献的前景清单"),
    provenance: "Entity",
    sourceIds: ["thesis"],
    sourceNote: tx("Thesis Table 1", "论文表1"),
    allocation: tx("Per 1 kg precursor; not yet scaled to battery BOM", "每1 kg前驱体；尚未按电池BOM缩放"),
    ai: tx("Requires cathode mass per functional unit before scaling.", "缩放前需要每功能单位的正极材料质量。"),
    positions: { product: { x: 30, y: 125 } },
  },
  ...[
    ["niso4", "NiSO4", "硫酸镍", "564 g/kg precursor", { x: -180, y: 10 }],
    ["mnso4", "MnSO4", "硫酸锰", "564 g/kg precursor", { x: -210, y: 85 }],
    ["coso4", "CoSO4", "硫酸钴", "550 g/kg precursor", { x: -220, y: 160 }],
    ["naoh", "NaOH (100%)", "氢氧化钠（100%）", "890 g/kg precursor", { x: -215, y: 235 }],
    ["nh4oh", "NH4OH (100%)", "氢氧化铵（100%）", "124 g/kg precursor", { x: -180, y: 310 }],
    ["process_water", "Water", "水", "0.169 gallon/kg precursor", { x: -125, y: 385 }],
  ].map(([id, en, zh, value, position]) => ({
    id,
    type: "material",
    views: ["product"],
    flags: ["bom"],
    name: tx(en, zh),
    subtitle: tx("Precursor inventory input", "前驱体清单投入"),
    description: tx("Input reported for one kilogram of reference precursor.", "每1 kg基准前驱体报告的投入。"),
    productValue: value,
    factoryValue: tx("No plant-specific record", "无工厂特定记录"),
    stage: tx("Cathode precursor production", "正极前驱体生产"),
    scope: tx("Scope 3 upstream", "Scope 3上游"),
    status: "academic",
    quality: tx("Thesis inventory", "论文清单数据"),
    provenance: "Entity",
    sourceIds: ["thesis"],
    sourceNote: tx("Thesis Table 1", "论文表1"),
    allocation: tx("Per kg precursor; scaling factor missing", "每kg前驱体；缺少缩放系数"),
    ai: tx("Do not scale until cathode mass is confirmed.", "在正极质量确认前不得缩放。"),
    positions: { product: position },
  })),
  ...[
    ["scope1", "Scope 1", "Scope 1", "Direct fuel, owned vehicles and refrigerant losses", "直接燃料、自有车辆和制冷剂泄漏", { x: 320, y: 115 }],
    ["scope2", "Scope 2", "Scope 2", "Purchased electricity, steam, heat and cooling", "外购电力、蒸汽、热力和冷量", { x: 610, y: 70 }],
    ["scope3_up", "Scope 3 upstream", "Scope 3上游", "Purchased materials, inbound logistics and outsourced waste", "采购材料、上游运输和委外废弃物处理", { x: 920, y: 135 }],
    ["scope3_down", "Scope 3 downstream", "Scope 3下游", "Distribution, use and end-of-life", "分销、使用和生命末期", { x: 940, y: 505 }],
  ].map(([id, en, zh, den, dzh, position]) => ({
    id,
    type: "scope",
    views: ["factory"],
    name: tx(en, zh),
    subtitle: tx("Organization inventory category", "组织盘查类别"),
    description: tx(den, dzh),
    productValue: tx("Not a product life-cycle stage", "不是产品生命周期阶段"),
    factoryValue: tx("Awaiting activity data", "等待活动数据"),
    stage: tx("Organization inventory", "组织盘查"),
    scope: en,
    status: "missing",
    quality: tx("Framework mapped; values missing", "已完成框架映射；数值缺失"),
    provenance: "Activity",
    sourceIds: ["ghgProtocol"],
    sourceNote: tx("GHG Protocol Corporate Standard", "GHG Protocol企业标准"),
    allocation: tx("Do not sum with the product footprint total", "不得与产品碳足迹总量相加"),
    ai: tx("Collect source-specific activity data and evidence.", "收集排放源活动数据及证据。"),
    positions: { factory: position },
  })),
  ...[
    ["refrigerant", "Refrigerant leakage", "制冷剂泄漏", "scope1", { x: 130, y: 70 }],
    ["owned_fleet", "Owned vehicles and forklifts", "自有车辆与叉车", "scope1", { x: 120, y: 195 }],
    ["purchased_steam", "Purchased steam / heat", "外购蒸汽/热力", "scope2", { x: 750, y: 95 }],
    ["purchased_materials", "Purchased materials", "采购材料", "scope3_up", { x: 1110, y: 75 }],
    ["inbound_logistics", "Inbound logistics", "上游运输", "scope3_up", { x: 1135, y: 185 }],
    ["outsourced_waste", "Outsourced waste treatment", "委外废弃物处理", "scope3_up", { x: 1110, y: 295 }],
    ["distribution", "Outbound distribution", "下游分销", "scope3_down", { x: 1130, y: 445 }],
    ["use_phase", "Use-phase energy losses", "使用阶段能量损失", "scope3_down", { x: 1145, y: 555 }],
    ["end_of_life", "End-of-life treatment", "生命末期处理", "scope3_down", { x: 1080, y: 660 }],
  ].map(([id, en, zh, scopeId, position]) => ({
    id,
    parentScope: scopeId,
    type: "activity",
    views: ["factory"],
    name: tx(en, zh),
    subtitle: tx("Required activity data", "所需活动数据"),
    description: tx(
      "Required factory inventory item. Primary activity data and supporting evidence have not been supplied.",
      "工厂盘查所需项目，尚未提供一级活动数据及支持证据。"
    ),
    productValue: tx("Coverage depends on product boundary", "是否纳入取决于产品边界"),
    factoryValue: tx("Missing", "缺失"),
    stage: tx("Factory inventory", "工厂盘查"),
    scope: scopeId.replace("_", " ").toUpperCase(),
    status: "missing",
    quality: tx("No evidence supplied", "未提供证据"),
    provenance: "Activity",
    sourceIds: ["ghgProtocol", "batteryStandard"],
    sourceNote: tx("Framework requirement", "框架要求"),
    allocation: tx("To be defined after data collection", "数据收集后定义"),
    ai: tx("Generate an owner-specific data request and block calculation.", "生成责任部门数据请求并阻止计算。"),
    positions: { factory: position },
  })),
  {
    id: "plant_output",
    type: "activity",
    views: ["factory"],
    name: tx("Annual good output and yield", "年度合格产量与良率"),
    subtitle: tx("Allocation denominator", "分配分母"),
    description: tx(
      "Good output, scrap, rework and stock change are needed to reconcile material and energy flows.",
      "需要合格产量、不良品、返工和库存变化来核对物料与能源流。"
    ),
    productValue: tx("Functional unit available", "功能单位可用"),
    factoryValue: tx("MES output missing", "缺少MES产量"),
    stage: tx("Manufacturing", "制造"),
    scope: tx("Allocation and reconciliation", "分配与平衡核对"),
    status: "missing",
    quality: tx("No primary data", "无一级数据"),
    provenance: "Activity",
    sourceIds: ["batteryStandard"],
    sourceNote: tx("Required for plant-specific modelling", "工厂特定建模所需"),
    allocation: tx("Causal drivers preferred over simple unit count", "优先使用因果参数而非简单数量"),
    ai: tx("Request MES export by model, period, good output, scrap and rework.", "按型号、周期、合格品、不良品和返工请求MES导出。"),
    positions: { factory: { x: 620, y: 660 } },
  },
  ...[
    ["cathode_supplier", "Cathode supplier archetype", "正极材料供应商原型", { x: 85, y: 105 }],
    ["aluminium_supplier", "Aluminium supplier archetype", "铝供应商原型", { x: 85, y: 270 }],
    ["grid_operator", "Electricity supplier archetype", "电力供应商原型", { x: 85, y: 585 }],
    ["logistics_provider", "Logistics provider archetype", "物流服务商原型", { x: 360, y: 315 }],
    ["customer", "Downstream customer archetype", "下游客户原型", { x: 1050, y: 185 }],
    ["recycler", "Recycler archetype", "回收企业原型", { x: 1050, y: 480 }],
  ].map(([id, en, zh, position]) => ({
    id,
    type: "organization",
    views: ["supply"],
    name: tx(en, zh),
    subtitle: tx("Illustrative organization", "演示组织"),
    description: tx(
      "Structural placeholder for future primary data exchange. It does not represent a named real company.",
      "用于未来一级数据交换的结构占位，不代表任何具名真实企业。"
    ),
    productValue: tx("No verified PCF received", "未收到经核验PCF"),
    factoryValue: tx("No verified activity data", "无经核验活动数据"),
    stage: tx("Supply-chain ecosystem", "供应链生态"),
    scope: tx("Depends on reporting organization", "取决于报告组织"),
    status: "illustrative",
    quality: tx("Demonstration node", "演示节点"),
    provenance: "Agent",
    sourceIds: ["pact", "prov"],
    sourceNote: tx("Architecture placeholder", "架构占位"),
    allocation: tx("No numerical allocation", "无数值分配"),
    ai: tx("Onboard supplier evidence before accepting a footprint value.", "接收碳足迹数值前需接入供应商证据。"),
    positions: { supply: position },
  })),
  {
    id: "pact_exchange",
    type: "standard",
    views: ["supply"],
    name: tx("PACT PCF exchange record", "PACT产品碳足迹交换记录"),
    subtitle: tx("Interoperable data envelope", "互操作数据载体"),
    description: tx(
      "Future supplier footprints can be exchanged with explicit product, boundary, methodology, geography and assurance metadata.",
      "未来可交换带有产品、边界、方法、地区和鉴证元数据的供应商碳足迹。"
    ),
    productValue: tx("Schema available", "Schema可用"),
    factoryValue: tx("No supplier records connected", "尚未连接供应商记录"),
    stage: tx("Data exchange", "数据交换"),
    scope: tx("Product-level Scope 3 data", "产品级Scope 3数据"),
    status: "framework",
    quality: tx("Technical specification", "技术规范"),
    provenance: "Entity",
    sourceIds: ["pact"],
    sourceNote: tx("PACT Technical Specifications 3.0.3", "PACT技术规范3.0.3"),
    allocation: tx("Carries values; does not calculate them", "承载数值；不负责计算"),
    ai: tx("Map supplier documents to candidate fields, then require validation.", "将供应商文件映射为候选字段，再进行验证。"),
    positions: { supply: { x: 610, y: 560 } },
  },
  ...[
    ["scenario_recycled_al", "Secondary aluminium", "再生铝情景", "109.26 kg CO2e/kWh", { x: 720, y: 75 }],
    ["scenario_wind", "Wind electricity", "风电情景", "126.95 kg CO2e/kWh", { x: 900, y: 75 }],
    ["scenario_combined", "Combined intervention", "组合情景", "90.53 kg CO2e/kWh", { x: 1060, y: 75 }],
  ].map(([id, en, zh, value, position]) => ({
    id,
    type: "scenario",
    views: ["product"],
    flags: ["scenario"],
    name: tx(en, zh),
    subtitle: tx("Academic scenario", "学术情景"),
    description: tx(
      "Scenario result from the thesis; assumes full substitution and is not an industrially validated reduction claim.",
      "论文情景结果；假设完全替代，不是经产业验证的减排声明。"
    ),
    productValue: value,
    factoryValue: tx("Not implemented", "未实施"),
    stage: tx("Scenario comparison", "情景比较"),
    scope: tx("Same cradle-to-gate model boundary", "相同摇篮到大门边界"),
    status: "scenario",
    quality: tx("Academic what-if scenario", "学术假设情景"),
    provenance: "Entity",
    sourceIds: ["thesis"],
    sourceNote: tx("Thesis Figure 2a", "论文图2a"),
    allocation: tx("Comparable only within the thesis assumptions", "仅在论文假设内可比"),
    ai: tx("Do not present as a forecast without technical and economic validation.", "未经技术和经济验证不得作为预测。"),
    positions: { product: position },
  })),
  ...[
    ["evidence_store", "Evidence store", "证据库", "Approved source files and access controls", "授权原始文件与访问控制", commonPositions.aiEvidence],
    ["ai_extract", "AI candidate extraction", "AI候选字段提取", "Extract, map and cite; never invent", "提取、映射和引用；不得编造", commonPositions.aiExtract],
    ["rule_validation", "Deterministic validation", "确定性规则验证", "Units, required fields, boundary and factor versions", "单位、必填字段、边界和因子版本", commonPositions.aiRules],
    ["human_approval", "Qualified human approval", "专业人员审批", "Approve consequential mappings and assumptions", "批准关键映射和假设", commonPositions.aiHuman],
    ["lca_engine", "LCA calculation engine", "LCA计算引擎", "Reproducible calculation from approved inputs", "使用已批准输入进行可重复计算", commonPositions.aiEngine],
  ].map(([id, en, zh, den, dzh, position]) => ({
    id,
    type: "process",
    views: ["product", "factory", "supply"],
    flags: ["ai"],
    name: tx(en, zh),
    subtitle: tx("Controlled workflow layer", "受控工作流层"),
    description: tx(den, dzh),
    productValue: tx("Workflow control", "工作流控制"),
    factoryValue: tx("Workflow control", "工作流控制"),
    stage: tx("Data governance", "数据治理"),
    scope: tx("Not an emission source", "不是排放源"),
    status: id === "ai_extract" ? "ai" : "framework",
    quality: tx("Prototype architecture", "原型架构"),
    provenance: id === "human_approval" ? "Agent" : "Activity",
    sourceIds: ["prov", "pact"],
    sourceNote: tx("Evidence-grounded workflow design", "基于证据的工作流设计"),
    allocation: tx("No carbon value added", "不增加碳排放数值"),
    ai: tx(
      "The language model may propose; rules and qualified users control acceptance.",
      "语言模型可以提出建议；规则和专业用户控制是否接受。"
    ),
    positions: {
      product: position,
      factory: position,
      supply: position,
    },
  })),
];

const edge = (id, source, target, views, relation, flags = []) => ({
  id,
  source,
  target,
  views,
  relation,
  flags,
});

const edges = [
  edge("e_product_raw", "raw_stage", "nmc111", ["product"], tx("contributes to", "贡献至")),
  edge("e_mfg_product", "manufacturing_stage", "nmc111", ["product"], tx("contributes to", "贡献至")),
  edge("e_cathode_raw", "cathode", "raw_stage", ["product"], tx("component burden", "组件负荷")),
  edge("e_al_raw", "aluminium", "raw_stage", ["product"], tx("component burden", "组件负荷")),
  edge("e_sep_raw", "separator", "raw_stage", ["product"], tx("component burden", "组件负荷")),
  edge("e_other_raw", "other_materials", "raw_stage", ["product"], tx("component burden", "组件负荷")),
  edge("e_electricity_mfg", "electricity", "manufacturing_stage", ["product"], tx("energy input", "能源投入")),
  edge("e_gas_mfg", "natural_gas", "manufacturing_stage", ["product"], tx("fuel input", "燃料投入")),
  edge("e_precursor_cathode", "reference_precursor", "cathode", ["product"], tx("input to", "投入至"), ["bom"]),
  ...["niso4", "mnso4", "coso4", "naoh", "nh4oh", "process_water"].map((id) =>
    edge(`e_${id}_precursor`, id, "reference_precursor", ["product"], tx("inventory input", "清单投入"), ["bom"])
  ),
  edge("e_factory_scope1", "scope1", "factory", ["factory"], tx("reported by", "归入")),
  edge("e_factory_scope2", "scope2", "factory", ["factory"], tx("reported by", "归入")),
  edge("e_factory_scope3up", "scope3_up", "factory", ["factory"], tx("reported by", "归入")),
  edge("e_factory_scope3down", "scope3_down", "factory", ["factory"], tx("reported by", "归入")),
  edge("e_gas_scope1", "natural_gas", "scope1", ["factory"], tx("classified as", "分类为")),
  edge("e_refrigerant_scope1", "refrigerant", "scope1", ["factory"], tx("classified as", "分类为")),
  edge("e_fleet_scope1", "owned_fleet", "scope1", ["factory"], tx("classified as", "分类为")),
  edge("e_electricity_scope2", "electricity", "scope2", ["factory"], tx("classified as", "分类为")),
  edge("e_steam_scope2", "purchased_steam", "scope2", ["factory"], tx("classified as", "分类为")),
  edge("e_material_scope3", "purchased_materials", "scope3_up", ["factory"], tx("classified as", "分类为")),
  edge("e_inbound_scope3", "inbound_logistics", "scope3_up", ["factory"], tx("classified as", "分类为")),
  edge("e_waste_scope3", "outsourced_waste", "scope3_up", ["factory"], tx("classified as", "分类为")),
  edge("e_distribution_scope3", "distribution", "scope3_down", ["factory"], tx("classified as", "分类为")),
  edge("e_use_scope3", "use_phase", "scope3_down", ["factory"], tx("classified as", "分类为")),
  edge("e_eol_scope3", "end_of_life", "scope3_down", ["factory"], tx("classified as", "分类为")),
  edge("e_factory_product", "factory", "nmc111", ["factory", "supply"], tx("manufactures", "制造")),
  edge("e_output_product", "plant_output", "nmc111", ["factory"], tx("allocates to", "分配至")),
  edge("e_cath_supplier_cathode", "cathode_supplier", "cathode", ["supply"], tx("supplies", "供应")),
  edge("e_al_supplier_al", "aluminium_supplier", "aluminium", ["supply"], tx("supplies", "供应")),
  edge("e_grid_electricity", "grid_operator", "electricity", ["supply"], tx("supplies", "供应")),
  edge("e_cathode_logistics", "cathode", "logistics_provider", ["supply"], tx("transported by", "运输经由")),
  edge("e_al_logistics", "aluminium", "logistics_provider", ["supply"], tx("transported by", "运输经由")),
  edge("e_logistics_factory", "logistics_provider", "factory", ["supply"], tx("delivers to", "交付至")),
  edge("e_electricity_factory", "electricity", "factory", ["supply"], tx("consumed by", "由其消耗")),
  edge("e_product_customer", "nmc111", "customer", ["supply"], tx("delivered to", "交付至")),
  edge("e_customer_recycler", "customer", "recycler", ["supply"], tx("end-of-life flow", "报废流向")),
  edge("e_pact_cathode", "pact_exchange", "cathode_supplier", ["supply"], tx("data exchange", "数据交换")),
  edge("e_pact_al", "pact_exchange", "aluminium_supplier", ["supply"], tx("data exchange", "数据交换")),
  ...[
    ["e_ai_1", "evidence_store", "ai_extract"],
    ["e_ai_2", "ai_extract", "rule_validation"],
    ["e_ai_3", "rule_validation", "human_approval"],
    ["e_ai_4", "human_approval", "lca_engine"],
  ].map(([id, source, target]) =>
    edge(id, source, target, ["product", "factory", "supply"], tx("controlled hand-off", "受控传递"), ["ai"])
  ),
  edge("e_ai_product", "lca_engine", "nmc111", ["product", "factory", "supply"], tx("approved result", "已批准结果"), ["ai"]),
  edge("e_scenario_al", "nmc111", "scenario_recycled_al", ["product"], tx("compared with", "对比"), ["scenario"]),
  edge("e_scenario_wind", "nmc111", "scenario_wind", ["product"], tx("compared with", "对比"), ["scenario"]),
  edge("e_scenario_combined", "nmc111", "scenario_combined", ["product"], tx("compared with", "对比"), ["scenario"]),
];

const audits = [
  {
    id: "plant-electricity",
    severity: "high",
    nodeId: "electricity",
    title: tx("Plant electricity evidence is missing", "工厂电力证据缺失"),
    detail: tx(
      "The academic model contains a product energy input, but there is no annual utility bill, meter hierarchy or plant allocation record.",
      "学术模型包含产品能源投入，但没有年度电费单、分表结构或工厂分配记录。"
    ),
    action: tx("Request utility bills, meter IDs and process allocation drivers.", "请求电费单、仪表编号和工序分配参数。"),
  },
  {
    id: "bom-scale",
    severity: "high",
    nodeId: "reference_precursor",
    title: tx("Precursor inventory cannot yet be scaled to the battery", "前驱体清单尚不能缩放至电池"),
    detail: tx(
      "The thesis reports inputs per kilogram of precursor, but cathode mass per functional unit is not explicitly listed in the paper.",
      "论文报告每kg前驱体投入，但未明确列出每功能单位的正极材料质量。"
    ),
    action: tx("Connect the Activity Browser export or confirmed battery BOM.", "连接Activity Browser导出或经确认的电池BOM。"),
  },
  {
    id: "plant-output",
    severity: "high",
    nodeId: "plant_output",
    title: tx("Annual good output and yield are missing", "年度合格产量与良率缺失"),
    detail: tx(
      "Without good output, scrap, rework and stock change, shared energy and material losses cannot be allocated reliably.",
      "缺少合格产量、不良品、返工和库存变化时，无法可靠分配共享能源和物料损失。"
    ),
    action: tx("Request a model-level MES export for a consistent reporting period.", "请求同一报告周期的型号级MES导出。"),
  },
  {
    id: "geography",
    severity: "medium",
    nodeId: "nmc111",
    title: tx("Academic background data are not plant-representative", "学术背景数据不代表具体工厂"),
    detail: tx(
      "The thesis uses global-average and Rest-of-World ecoinvent datasets. A China plant requires geographic and temporal review.",
      "论文采用全球平均和RoW ecoinvent数据；中国工厂需要复核地区与时间代表性。"
    ),
    action: tx("Replace material and electricity factors with approved representative datasets.", "使用经批准且具代表性的数据集替换材料和电力因子。"),
  },
  {
    id: "double-counting",
    severity: "medium",
    nodeId: "factory",
    title: tx("Product and organization totals must remain separate", "产品与组织总量必须分开"),
    detail: tx(
      "The 145.69 product result already includes upstream and manufacturing burdens. It must not be added directly to plant Scope totals.",
      "145.69产品结果已包含上游和制造负荷，不得直接与工厂Scope总量相加。"
    ),
    action: tx("Link records through allocation and provenance edges instead of summing totals.", "通过分配和来源边连接记录，而不是相加总量。"),
  },
  {
    id: "supplier-boundary",
    severity: "medium",
    nodeId: "pact_exchange",
    title: tx("Supplier PCF boundaries require validation", "供应商PCF边界需要验证"),
    detail: tx(
      "A received supplier footprint is not usable until product, boundary, methodology, geography, period and assurance metadata align.",
      "收到的供应商碳足迹只有在产品、边界、方法、地区、周期和鉴证元数据一致后才能使用。"
    ),
    action: tx("Validate the exchange record before linking it to the product model.", "在关联产品模型前验证交换记录。"),
  },
];

module.exports = { nodes, edges, sources, audits };
