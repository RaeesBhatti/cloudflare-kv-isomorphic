# cloudflare-kv-isomorphic

Use Cloudflare Worker KV locally in NodeJS and in production using the same API

## Usage

```typescript
import KV from "cloudflare-kv-isomorphic";

const MY_NAMESPACE = KV("MY_NAMESPACE");

await MY_NAMESPACE.put("key", "value");
await MY_NAMESPACE.get("key");
```
