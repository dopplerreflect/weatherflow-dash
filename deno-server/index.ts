import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { handleSocket } from "./websocket.ts";
import { fetchWindsAloftData, transformWindsAloftData } from "./winds-aloft.ts";

const DEFAULT_PORT = 3001;
const ENV = config();
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const router = new Router();

router
  .get("/ws", handleSocket)
  .get("/winds-aloft/:latitude/:longitude/:elevation", async (ctx) => {
    if (ctx.params && ctx.params.latitude && ctx.params.longitude) {
      const elevation = Number(ctx.params.elevation) || 0;
      const body = await fetchWindsAloftData(
        ctx.params.latitude,
        ctx.params.longitude,
      );
      ctx.response.type = "application/json";
      ctx.response.headers.append("Access-Control-Allow-Origin", "*");
      ctx.response.body = transformWindsAloftData(body, elevation);
    }
  })
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
