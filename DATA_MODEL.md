# Carbon Graph Data Model

## Node classes

| Class | Meaning | Examples |
|---|---|---|
| Product | A product-system result under a defined functional unit and boundary | NMC111 battery pack |
| Factory | The reporting organization or manufacturing site | Battery manufacturing plant |
| Component | A material or component contribution inside the product model | Cathode, aluminium, separator |
| Activity | A measurable process or flow | Electricity, natural gas, inbound transport |
| Scope | An organization-inventory classification | Scope 1, Scope 2, Scope 3 upstream |
| Organization | A supply-chain data owner | Cathode supplier archetype |
| Evidence | A source record used to support a candidate value | Bill, meter export, thesis table |
| Process | A controlled data workflow step | AI extraction, validation, human approval |
| Standard | A reporting or exchange rule | PACT exchange record |

The `provenance` field maps records to the W3C PROV starting-point concepts `Entity`, `Activity` and `Agent`.

## Required record fields

Each numerical record should eventually include:

- reporting product and manufacturing plant;
- value and unit;
- reporting period;
- functional or declared unit;
- product-system boundary;
- organization Scope mapping where relevant;
- life-cycle stage;
- allocation method and allocation driver;
- geography and technology coverage;
- primary or secondary data classification;
- emission-factor source and version;
- source document and source location;
- AI suggestion, confidence and model version, if AI was used;
- human reviewer, decision and time;
- verification or assurance status.

## Electricity example

`Purchased electricity` is one shared activity concept with separate contextual records:

- Product context: electricity allocated to one kWh of NMC111 battery capacity.
- Factory context: total annual purchased electricity within the organization boundary.
- Scope context: Scope 2 for the plant.
- Product-LCA context: manufacturing-stage energy input.
- Evidence context: utility bill, meter hierarchy, process sub-meter and allocation record.

These records are related but are not interchangeable. The factory total cannot replace the product allocation, and the product input cannot be added to the factory Scope 2 total.

## Scaling to an industrial ecosystem

The next data-model increment should add stable identifiers for organizations, facilities, products and product-footprint records. Supplier values can then be exchanged as versioned PCF envelopes, while evidence access remains governed separately. A downstream product can reference an approved upstream PCF without receiving every confidential source document.
