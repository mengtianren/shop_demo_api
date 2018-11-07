const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  ctx.body = "This is shoop_demo_api";
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

module.exports = router;
