import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import handleCommand from "./commands.ts";

const app = new Application();
const router = new Router();

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

router.get("/api/:command", async (ctx) => {
  ctx.response.body = await handleCommand(ctx.params.command);;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
