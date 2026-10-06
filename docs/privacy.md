# Data handling

The public service accepts bond-discovery inputs such as a product query, catalog jurisdiction, identifier and required face amount. No customer account is connected. Do not send names, Social Security numbers, payment details, financial documents or other applicant records.

Free-text searches are processed to answer the request, even though raw queries are excluded from MCP analytics. A user could accidentally put personal information into free text; the absence of dedicated personal-data fields does not mean the service could never receive it.

## Hosting and operational analytics

- **Vercel** hosts and protects the service. Hosting and security logs can contain request/network metadata. Rate limiting uses opaque IP-derived caller keys. An AI platform's outbound IP is not necessarily the end user's IP.
- **PostHog** processes limited operational events: tool name, timing, outcome, bounded error categories, result/link counts, server version and recognized client labels. Request/session identifiers support operational measurement; they are not verified buyer identities. Client labels are self-reported.
- MCP operational events exclude raw queries, arguments, responses, full URLs, applicant details and credentials. Person profiles and geolocation are disabled, and the analytics IP is suppressed.

## Retention and privacy requests

Operational analytics events currently have no fixed automatic age-based deletion period and may remain for longer than 12 months. Hosting/security records have separate retention by log type and provider configuration. Stateless transport does not mean zero retention.

For access or deletion requests, contact **cyrus@lightrfp.com**, identifying the MCP service. An approximate time, AI client, or request reference can help locate records; do not send credentials, payment information, or a full conversation. Operational identifiers may not identify an individual. The privacy request process addresses identification limits and applicable legal retention requirements; this guide does not promise a new deletion SLA. The AI platform handles requests about its own chat history separately.

See the [MCP privacy notice](https://www.lightrfp.com/privacy-policy#mcp-service) and [MCP service-provider disclosures](https://www.lightrfp.com/legal/subprocessors), including the [Vercel Privacy Notice](https://vercel.com/legal/privacy-notice) and [PostHog Privacy Policy](https://posthog.com/privacy). Those provider notices describe their practices; this guide describes the limited fields sent by this integration.

## Following a link

Catalog lookups use the deployed snapshot. They do not send a live lookup to the separate application provider. Following a Light RFP link begins a separate website/application journey governed by its applicable disclosures. Website analytics are distinct from MCP tool events. Returning a link does not prove a click, submitted application or purchase.

See the [Light RFP privacy policy](https://www.lightrfp.com/privacy-policy) and [terms](https://www.lightrfp.com/terms). For integration questions, contact **David@lightrfp.com**. Use the privacy policy's contact instructions for privacy requests.
