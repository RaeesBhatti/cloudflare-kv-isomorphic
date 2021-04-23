import fs from "fs";

export default function (namespace): KV {
  if (typeof globalThis[namespace] !== "undefined") return globalThis[namespace];
  return globalThis[namespace] = new KV(namespace);
}

class KV {
  initiated = false;
  data: Record<string, [unknown, number | null]>;
  filename;

  constructor(public namespace) {
  }

  async init() {
    if (this.initiated) return;

    this.filename = `./.kv-${encodeURIComponent(this.namespace)}`;
    const contents = await fs.promises.readFile(this.filename, { encoding: "utf8", flag: "as+" });
    this.data = JSON.parse(contents || "{}");
    const now = new Date().getTime() / 1000;
    Object.entries(this.data).forEach(([k, v]) => {
      if (v[1] != null && v[1] < now) this.delete(k);
    });
  }

  async put(key: string, value: string | ArrayBuffer, options: { expiration?: number, expirationTtl?: number } = {}) {
    await this.init();
    const now = Math.round(new Date().getTime() / 1000);
    let expiresAt;
    if (typeof options.expiration === "number") {
      if (options.expiration < now + 60) {
        return value;
      }
      expiresAt = options.expiration;
    } else if (typeof options.expirationTtl === "number") {
      if (options.expirationTtl < 60) {
        return value;
      }
      expiresAt = options.expirationTtl + now;
    }

    this.data[key] = [value, expiresAt];
    await fs.promises.writeFile(this.filename, JSON.stringify(this.data), { encoding: "utf8" });
    return value;
  }

  async get(key: string) {
    await this.init();
    return (this.data[key] || [])[0];
  }

  async delete(key: string) {
    await this.init();
    const value = delete this.data[key];
    await fs.promises.writeFile(this.filename, JSON.stringify(this.data), { encoding: "utf8" });
    return value;
  }

  async list(prefix: string = "", limit: number = 0, cursor) {
    await this.init();
    return Object.keys(this.data).filter(k => k.startsWith(prefix)).slice(0, limit + 1);
  }
}
