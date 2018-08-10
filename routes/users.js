const router = require('koa-router')()
const { ShopUser } = require('../controller/User')
router.prefix('/api/users')

router.post('/register', async ctx => await ShopUser.register(ctx))
router.post('/login', async ctx => await ShopUser.login(ctx))
router.post('/out', async ctx => await ShopUser.loginOut(ctx))

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
