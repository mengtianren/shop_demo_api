const router = require("koa-router")();
const { GoodDetail } = require("../controller/Detail");
router.prefix("/api/detail");

router.post("/create", async ctx => await GoodDetail.CreateDetail(ctx));
router.post("/find", async ctx => await GoodDetail.FindDetail(ctx));
router.post("/type", async ctx => await GoodDetail.CreateDetailType(ctx));

module.exports = router;
