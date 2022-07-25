import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import CommandHandler from "./commands.ts";

const app = new Application();
const router = new Router();
const commandHandler = new CommandHandler();
commandHandler.setup();

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
  ctx.response.body = await commandHandler.handleCommand(ctx.params.command);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
