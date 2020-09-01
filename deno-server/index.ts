import { mimeTypes } from "./mime-types.ts";
import {
  listenAndServe,
  acceptWebSocket,
  acceptable,
} from "./deps.ts";
import { handleWs } from "./websocket.ts";

listenAndServe({ port: 3001 }, async (req) => {
  let body = "";
  let headers = new Headers();
  switch (req.url) {
    case "/":
      body = await Deno.readTextFile("../react-app/build/index.html");
      req.respond({ body });
      break;
    case "/favicon.ico":
      body = await Deno.readTextFile("../react-app/build/favicon.svg");
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
        body = await Deno.readTextFile(`../react-app/build/${req.url}`);
      } catch (e) {
        console.error(body, e);
      }
      req.respond({ body, headers });
  }
});
