import * as flags from "https://deno.land/std/flags/mod.ts";
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { handleSocket } from "./websocket.ts";
import { handleWindsAloftRequest } from "./winds-aloft.ts";

const DEFAULT_PORT = 3001;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const router = new Router();

router
  .get("/ws", handleSocket)
  .get("/winds-aloft", handleWindsAloftRequest);

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
