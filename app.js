const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
var cors = require('koa-cors');
const index = require('./routes/index')
const users = require('./routes/users')
const good = require('./routes/good')
const commodity = require('./routes/commodity')
const detail = require('./routes/detail')

app.use(cors({
    origin : 'http://www.mteen.cn:8080',
    credentials : true
    }));
// error handler
onerror(app)

app.keys = ['shop']
const sessionConfig = {
    key : 'session',
    httpOnly: false, //*cookie数据是js否能操作 true为不能操作 false为能
    signed: true, //如果为true 则加密base64 防止数据被更改
    rolling: false, // 涉及cookie更新
    renew: false,// 涉及cookie更新
};
app.use(session(sessionConfig,app))




// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  //   console.log(ctx.body,ctx.request.query)
  // ctx.request.body = await ctx.request.body || ctx.body
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(good.routes(), good.allowedMethods())
app.use(commodity.routes(), commodity.allowedMethods())
app.use(detail.routes(), detail.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
