# Connect and troubleshoot

Use `https://mcp.lightrfp.com/api/mcp` with remote MCP Streamable HTTP. No authorization header is needed. Use the host's remote-connector settings; configuration filenames and plan requirements vary by client.

The [Node example](../examples/search.mjs) demonstrates initialization, the initialized notification, tool discovery and a search using ordinary HTTP. Production integrations should use a maintained MCP SDK. The example is specific to this stateless service, not a general-purpose MCP client.

## Request basics

- Send JSON-RPC using HTTP POST and `Content-Type: application/json`.
- Accept both `application/json` and `text/event-stream`.
- Initialize the MCP connection before calling tools and use the negotiated protocol version.
- Do not send applicant records or secrets. Authentication is not required.
- Normal browser GET requests return 405. Browser CORS access is not enabled; use a supported MCP host or server-side client.

## Traffic and errors

Published limits at review: 300 requests per caller IP per minute, 1,000 admitted requests per service minute, and 10,000 per service hour, each per Vercel region. AI platforms can share an outbound IP. These are protection limits, not a throughput guarantee. See the [live documentation](https://mcp.lightrfp.com/) for changes.

| Outcome | Action |
| --- | --- |
| HTTP 405 | Use MCP POST requests, not a browser GET. |
| HTTP 429 | Respect `Retry-After` when supplied; use bounded backoff with jitter. |
| HTTP 503 | Service is temporarily unavailable; retry a limited number of times. |
| Invalid input/tool error | Inspect the schema or returned error; correct inputs instead of retrying unchanged. |
| Empty search | Try a relevant synonym or clarify the requirement; this is not proof the service is unavailable. |
| Held/unavailable product | Explain the returned availability; do not construct a bypass link. |

The service limits request bodies to 32 KiB and responses to 256 KiB. JSON-RPC batches and compressed request bodies are unsupported. Clients should avoid polling, parallel request bursts and unbounded retries.
