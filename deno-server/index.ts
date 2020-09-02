import { mimeTypes } from "./mime-types.ts";
import {
  listenAndServe,
  acceptWebSocket,
  acceptable,
  flags,
  path,
} from "./deps.ts";
import { handleWs } from "./websocket.ts";

const script = import.meta.url.replace(/^file:\/\//, "");
const { args } = Deno;
const DEFAULT_PORT = 3001;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

console.log(`Deno server listening on port ${port}`);

listenAndServe({ port }, async (req) => {
  let body = "";
  let headers = new Headers();
  switch (req.url) {
    case "/":
      body = await Deno.readTextFile(
        path.join(
          path.dirname(script),
          "..",
          "react-app",
          "dist",
          "index.html",
        ),
      );
      req.respond({ body });
      break;
    case "/favicon.ico":
      body = await Deno.readTextFile(
        path.join(path.dirname(script), "..", "react-app", "favicon.svg"),
      );
      headers.set("content-type", "image/svg+xml");
      req.respond({ body, headers });
      break;
    case "/ws":
      if (acceptable(req)) {
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        }).then(handleWs);
      }
      break;
    default:
      body = `${req.url}: not found`;
      const match: RegExpMatchArray | null = req.url.match(/\.(\w+)$/);
      const ext = match && match[1];
      if (ext) headers.set("content-type", mimeTypes[ext]);
      try {
        // body = await Deno.readTextFile(`../react-app/dist/${req.url}`);
        body = await Deno.readTextFile(
          path.join(path.dirname(script), "..", "react-app", "dist", req.url),
        );
      } catch (e) {
        console.error(body, e);
      }
      req.respond({ body, headers });
  }
});
