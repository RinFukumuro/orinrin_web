import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PREVIEW_PORT || 3000);
if (!existsSync(path.join(root, "index.html"))) {
  console.error("Run npm run build before starting the preview.");
  process.exit(1);
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const url = new URL(request.url || "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    let filePath = path.resolve(root, "." + pathname);
    if (!filePath.startsWith(root + path.sep) && filePath !== root) {
      response.writeHead(403).end();
      return;
    }
    let status = 200;
    try {
      const entry = await stat(filePath);
      if (entry.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          response.writeHead(308, { Location: url.pathname + "/" + url.search }).end();
          return;
        }
        filePath = path.join(filePath, "index.html");
      }
      await stat(filePath);
    } catch {
      filePath = path.join(root, "404.html");
      status = 404;
    }
    response.writeHead(status, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") { response.end(); return; }
    const stream = createReadStream(filePath);
    stream.on("error", () => response.destroy());
    stream.pipe(response);
  } catch {
    response.writeHead(400).end();
  }
});
server.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
