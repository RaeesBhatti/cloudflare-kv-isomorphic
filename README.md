# cloudflare-kv-local

Locally emulated API compatible with Cloudflare KV

## Usage

```typescript
import KV from "cloudflare-kv-local";

const kv = (typeof MY_NAMESPACE !== "undefined" ? MY_NAMESPACE : new KV("MY_NAMESPACE")) /* as KV */;

await kv.put("key", "value");
await kv.get("key");
```
