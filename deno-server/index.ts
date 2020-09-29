import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { handleSocket } from "./websocket.ts";

const DEFAULT_PORT = 3001;
const ENV = config();
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const router = new Router();

router
  .get("/ws", handleSocket)
  .get("/deployment-lat-lng-elev", async (ctx) => {
    ctx.response.headers.append("content-type", "application/json");
    ctx.response.headers.append(
      "access-control-allow-origin",
      "http://localhost:1234",
    );
    const bodyJSON = Deno.env.get("WINDS_ALOFT_QUERY_DATA") ||
      ENV.WINDS_ALOFT_QUERY_DATA ||
      JSON.stringify({ latitude: null, longitude: null, elevation: null });
    console.log(bodyJSON);
    ctx.response.body = JSON.parse(bodyJSON);
  });
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/dist`,
    index: "index.html",
  });
});

console.log(`Deno server listening on port ${port}`);
await app.listen({ port });
