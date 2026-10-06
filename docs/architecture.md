# Architecture and data flow

This companion repository documents a hosted service. It does not contain the private deployment implementation, full catalog, raw application forms, or a self-hosting package.

```mermaid
flowchart TD
    U[User] --> C[AI client]
    C -->|MCP tool call| H[Public HTTPS endpoint]
    H --> G[Traffic and input validation]
    G --> T[Five read-only catalog tools]
    T --> D[Deployed catalog and curated stored evidence]
    D --> T
    T -->|Structured facts and links| C
    C --> U
    U -->|Learn more| L[Light RFP explanation page]
    L --> A[Full application]
    U -. Optional direct link .-> A
    T -. Limited operational events .-> P[PostHog]
```

The catalog supplies product identifiers, availability, pricing rules, amount constraints and curated application evidence. Calculations run against the deployed snapshot. Generation of a new deployment does not by itself prove a new verification of every source fact.

## Request lifecycle

```mermaid
sequenceDiagram
    participant Client as MCP client
    participant Server as Light RFP MCP
    participant Catalog as Catalog snapshot
    Client->>Server: initialize
    Server-->>Client: Protocol, server info and instructions
    Client->>Server: notifications/initialized
    Client->>Server: tools/list
    Server-->>Client: Five tool schemas
    Client->>Server: search_bonds(query, state)
    Server->>Catalog: Match available products
    Catalog-->>Server: Product facts and evidence
    Server-->>Client: Structured results and Light RFP links
    Note over Client,Server: No application is created or submitted
```

## Application workflow boundary

```text
MCP discovery                         Website/application workflow
------------------------------        ----------------------------
Search / details / catalog price
Preparation topics / links    ------> Explanation page
                                      Full application
                                      Required approvals
                                      Purchase / issuance when available
```

The user chooses whether to continue to the website. The MCP neither transfers an applicant profile nor prefills the application. Application, approval, payment and issuance steps happen in a separate workflow with its own disclosures.

## Operational measurement

Tool events help identify latency, errors, empty results and returned-link counts. These counts do not establish answer views, clicks or purchases. Hosting/security metadata and MCP analytics are separate from browser analytics on the website. See [data handling](privacy.md).
