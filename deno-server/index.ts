import { mimeTypes } from "./mime-types.ts";
import {
  listenAndServe,
  acceptWebSocket,
  acceptable,
  flags,
  path,
  config,
} from "./deps.ts";
import { handleWs } from "./websocket.ts";

const ENV = config();
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
          "dist",
          "index.html",
        ),
      );
      req.respond({ body });
      break;
    case "/favicon.ico":
      body = await Deno.readTextFile(
        path.join(path.dirname(script), "..", "src", "favicon.svg"),
      );
      headers.set("content-type", "image/svg+xml");
      req.respond({ body, headers });
      break;
    case "/deployment-lat-lng-elev":
      headers.set("content-type", "application/json");
      headers.set("access-control-allow-origin", "http://localhost:1234");
      const bodyJSON = Deno.env.get("WINDS_ALOFT_QUERY_DATA") ||
        ENV.WINDS_ALOFT_QUERY_DATA ||
        JSON.stringify({ latitude: null, longitude: null, elevation: null });
      console.log(bodyJSON);
      body = JSON.parse(bodyJSON);
      req.respond({ body, headers });
      break;
    case "/ws":
      if (acceptable(req)) {
        const { conn, r: bufReader, w: bufWriter, headers } = req;
        acceptWebSocket({
          conn,
          bufReader,
          bufWriter,
          headers,
        }).then(handleWs);
      }
      break;
    default:
      body = `${req.url}: not found`;
      const match: RegExpMatchArray | null = req.url.match(/\.(\w+)$/);
      const ext = match && match[1];
      if (ext) headers.set("content-type", mimeTypes[ext]);
      try {
        body = await Deno.readTextFile(
          path.join(path.dirname(script), "..", "dist", req.url),
        );
      } catch (e) {
        console.error(body, e);
      }
      req.respond({ body, headers });
  }
});
