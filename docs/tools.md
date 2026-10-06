# Tool guide

Discover current schemas with MCP `tools/list`. Tools return readable content and structured results. Handle both protocol errors and a tool response with `isError: true`.

## Inputs

| Tool | Required inputs | Optional inputs |
| --- | --- | --- |
| `search_bonds` | `query` | `state`, `bondAmount`, `limit`, `offset` |
| `get_bond_details` | `state`, `slug` | None |
| `calculate_bond_price` | `state`, `slug` | `bondAmount` |
| `get_application_requirements` | `state`, `slug` | None |
| `get_application_link` | `state`, `slug` | `bondAmount` |

- `query`: 2–200 characters. Use a bond name, trade, or requirement. Exclude personal information.
- `state`: catalog jurisdiction slug, such as `new-york` or `federal`, 2–40 lowercase letters/hyphens. This is not an applicant address.
- `slug`: a product identifier returned by search; 1–160 lowercase letters, digits and hyphens.
- `bondAmount`: a positive USD face amount, up to 1,000,000,000, with at most two decimal places. This is neither a premium budget nor aggregate bonding-program capacity. Product-specific constraints still apply.
- `limit`: integer 1–10, default 5. `offset`: integer 0–10,000, default 0.

Undeclared inputs are rejected. Use returned `state` and `slug` values for follow-up calls rather than guessing identifiers.

## Suggested sequence

1. Search for the requirement with the user's jurisdiction and known required face amount.
2. Resolve ambiguous matches using the requesting authority or required form.
3. Retrieve details or preparation evidence needed to answer the question.
4. Calculate a price if an amount-specific calculation is needed.
5. Present the returned explanation link first. Include the returned full-application link when the correct product and amount are established.

## Interpretation rules

- Preserve pagination. If `nextOffset` is present and non-null, more results remain; a page is not the complete catalog.
- Prices describe the stored base-term catalog calculation. Do not imply a live quote, approval, or guaranteed issuance.
- Keep fixed, rated, minimum-only, underwritten and missing-price outcomes distinct. No price does not mean free.
- For credit questions, consult the returned credit evidence. Identity fields alone do not prove a credit check. Unknown evidence is not proof that no check occurs.
- Application preparation topics are an incomplete summary of stored form evidence. Do not invent extra documents or financial thresholds.
- A bonding program is a prequalification relationship. Do not put a requested aggregate program limit into `bondAmount` or imply a limit has been approved.
- Respect held/unavailable outcomes. Do not remove the jurisdiction or invent URLs to bypass them.
- Use returned `nextAction` and `secondaryAction` links, retaining their query parameters. A link returned by a tool does not establish a click, application, payment or sale.

The server supplies additional answer guidance with responses. Hosts remain responsible for their final answers and any separately sourced information.
