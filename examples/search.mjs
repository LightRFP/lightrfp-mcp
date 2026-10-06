// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Light RFP
// Node.js 22+. A small demonstration for Light RFP's stateless MCP endpoint.
// This is not a general MCP client; use a maintained MCP SDK for integrations.
const endpoint = 'https://mcp.lightrfp.com/api/mcp';
let protocol = '2025-03-26';
let id = 0;

async function request(method, params, notification = false) {
  const requestId = notification ? undefined : ++id;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...(method === 'initialize' ? {} : { 'MCP-Protocol-Version': protocol }),
    },
    body: JSON.stringify({ jsonrpc: '2.0', ...(notification ? {} : { id: requestId }), method, params }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}; retry-after=${response.headers.get('retry-after') ?? 'not supplied'}`);
  if (notification) { await response.body?.cancel(); return; }
  const body = await response.text();
  const messages = response.headers.get('content-type')?.includes('text/event-stream')
    ? body.split(/\r?\n\r?\n/).map(block => block.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n')).filter(Boolean).map(data => JSON.parse(data))
    : [JSON.parse(body)];
  const message = messages.find(item => item.id === requestId);
  if (!message) throw new Error('Missing JSON-RPC response');
  if (message.error) throw new Error(JSON.stringify(message.error));
  if (message.result?.isError) throw new Error(JSON.stringify(message.result));
  return message.result;
}

const initialized = await request('initialize', {
  protocolVersion: protocol,
  capabilities: {},
  clientInfo: { name: 'lightrfp-public-docs-example', version: '0.1.0' },
});
protocol = initialized.protocolVersion;
await request('notifications/initialized', {}, true);
const discovery = await request('tools/list', {});
console.log('Available tools:', discovery.tools.map(tool => tool.name).join(', '));
const result = await request('tools/call', {
  name: 'search_bonds',
  arguments: { query: 'public adjuster', state: 'new-york', limit: 1 },
});
console.log(JSON.stringify(result.structuredContent ?? result.content, null, 2));
