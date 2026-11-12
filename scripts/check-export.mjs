import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve("out");
assert.ok(existsSync(root), "Run npm run build first.");
function collect(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? collect(file) : [file];
  });
}
const pages = collect(root).filter((file) => file.endsWith(".html"));
const failures = [];
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = "/" + path.relative(root, file).split(path.sep).join("/");
  if (/YOUR_FORM_ID|github\.com\/example\/project|https:\/\/example\.com|地図の説明文をここに/.test(html)) {
    failures.push(`${route}: unfinished content`);
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^(?:https?:|mailto:|data:|tel:|#|\/\/)/.test(value)) continue;
    const url = new URL(value, "http://localhost" + route);
    const target = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (!target.startsWith(root + path.sep) && target !== root) {
      failures.push(`${route}: invalid path ${value}`);
      continue;
    }
    if (!existsSync(target) || (statSync(target).isDirectory() && !existsSync(path.join(target, "index.html")))) {
      failures.push(`${route}: missing ${value}`);
    }
  }
}
for (const locale of ["ja", "en"]) {
  for (const route of ["", "portfolio", "contact", "blog", "blog/hello-world", "maps/map1", "maps/map2", "maps/map3"]) {
    assert.ok(existsSync(path.join(root, locale, route, "index.html")), `Missing /${locale}/${route}`);
  }
  const home = readFileSync(path.join(root, locale, "index.html"), "utf8");
  assert.ok(home.includes(locale === "ja" ? "プロフィール" : "About"), `Missing profile: ${locale}`);
}
assert.deepEqual(failures, [], failures.join("\n"));
console.log(`Checked ${pages.length} HTML pages: local links, assets, routes, and unfinished content passed.`);
