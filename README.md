# Light RFP Surety Bonds MCP

This repository contains public documentation and integration examples for the hosted **Light RFP Surety Bonds** MCP service. [Light RFP](https://www.lightrfp.com/) operates the service; [David Barakchian](https://github.com/dbarakchian) maintains this companion project. The hosted implementation and catalog are maintained separately.

Find the right surety bond, understand its catalog price and application requirements, and continue to Light RFP to learn more or apply. To explore or purchase surety bonds on the website, browse the [Light RFP surety bond directory](https://www.lightrfp.com/bonds).

**Endpoint:** `https://mcp.lightrfp.com/api/mcp`  
**Transport:** Streamable HTTP  
**Authentication:** None — no account or API key required  
**Service documentation:** [mcp.lightrfp.com](https://mcp.lightrfp.com/)

## Why use it?

The service exposes structured catalog facts and curated stored application evidence that are not all presented together in landing-page summaries. An assistant can inspect supported bond amounts, calculate catalog premiums, distinguish recorded credit requirements, and retrieve application preparation topics without extracting those details from page prose.

- **Clear pricing:** distinguish a bond's face amount from its premium, including recorded fees and base-term information.
- **Useful preparation:** retrieve stored credit-authorization evidence and application preparation topics where available.
- **Careful matching:** use jurisdiction, requesting authority, product variants, and supported amounts to avoid recommending the wrong bond.
- **A clear next step:** explanation-page links first, with a secondary full-application link when the product match is clear.

Availability and evidence vary by product. Calculations use a deployed catalog snapshot, not live underwriting. The service does not determine personal eligibility, submit applications, run credit checks, take payment, or issue bonds.

## Connect

In a client that supports remote MCP, add the endpoint above, select Streamable HTTP if prompted, and select **no authentication**. A normal browser visit to `/api/mcp` returns HTTP 405; use the documentation homepage or an MCP client instead.

Try: “Find a New York public adjuster bond. Explain its catalog price and credit requirements, then give me the Light RFP explanation and application links.”

For an executable example, install Node.js 22 or later and run:

```sh
node examples/search.mjs
```

The example makes a small number of read-only requests to the public service. No credentials or applicant details are needed. See [connection and troubleshooting](docs/connect.md).

## Tools

| Tool | Purpose |
| --- | --- |
| `search_bonds` | Find products by bond name, trade, jurisdiction, and known required face amount. |
| `get_bond_details` | Retrieve product details, amount constraints, price and credit/issuance evidence. |
| `calculate_bond_price` | Calculate the stored catalog price for a supported amount. |
| `get_application_requirements` | Retrieve preparation topics observed in stored application forms. |
| `get_application_link` | Retrieve a full-application link and price recap; creates no application. |

All five tools are read-only. See the [tool guide](docs/tools.md) for inputs and interpretation.

## How it works

```text
User asks a bond question
           |
           v
AI client -- MCP request --> Light RFP hosted service
                                  |
                                  v
                         Catalog + stored evidence
                                  |
AI client <-- structured facts + explanation/application links
    |
    v
User chooses Learn more --> Light RFP explanation page
                                |
                                v
                         Full application
```

See [architecture and Mermaid diagrams](docs/architecture.md), [example prompts](docs/prompts.md), and [data handling](docs/privacy.md).

## Project status and support

The public endpoint is available. Availability of the service does not imply approval or listing in any AI platform's directory. Configure clients according to their current remote-MCP capabilities; platform-specific access restrictions may apply.

For integration support, contact **David@lightrfp.com**. Use public issues for reproducible documentation and integration bugs without personal information. See [contributing](CONTRIBUTING.md) and [security reporting](SECURITY.md).

[Light RFP homepage](https://www.lightrfp.com/) · [Surety bond directory](https://www.lightrfp.com/bonds) · [Privacy policy](https://www.lightrfp.com/privacy-policy) · [Terms](https://www.lightrfp.com/terms)

Reviewed October 6, 2026. Tool discovery on the live endpoint is authoritative for the current machine-readable interface.

## License

Example code is MIT-licensed; documentation and illustrations are CC BY 4.0. These licenses do not cover the hosted service or private catalog. See [license scope](LICENSE.md).
