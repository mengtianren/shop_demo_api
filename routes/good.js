const router = require("koa-router")();
const { GoodType } = require("../controller/GoodType");
router.prefix("/api/type");

router.post("/list", async ctx => await GoodType.getList(ctx));
router.post("/create", async ctx => await GoodType.CreatType(ctx));

module.exports = router;
