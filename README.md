# kv-isomorphic

Use Cloudflare's Worker KV locally (local storage) and in production using the same API

## Usage

```typescript
import KV from "kv-isomorphic";

const kv = KV("MY_NAMESPACE");

await kv.put("key", "value");
await kv.get("key");
```
