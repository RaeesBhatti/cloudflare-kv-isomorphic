# kv-isomorphic

Use Cloudflare's Worker KV locally (local storage) and in production using the same API

## Usage

```typescript
import KV from "kv-isomorphic";

const kv = (typeof MY_NAMESPACE !== "undefined" ? MY_NAMESPACE : KV("MY_NAMESPACE")) /* as KV */;

await kv.put("key", "value");
await kv.get("key");
```
