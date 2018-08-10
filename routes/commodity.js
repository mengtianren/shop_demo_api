const router = require('koa-router')()
const { GoodCommodity } = require('../controller/Commodity')
router.prefix('/api/commodity')

router.post('/create', async ctx => await GoodCommodity.CreateCommodity(ctx))
router.post('/list', async ctx => await GoodCommodity.FindCommodity(ctx))

module.exports = router
