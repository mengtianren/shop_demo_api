const { Type } = require("../config/Index");

class GoodType {
  async getList(ctx) {
    try {
      let list = await Type.findAll();
      ctx.body = {
        code: 1,
        message: "获取类型成功",
        data: list
      };
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e.message,
        data: []
      };
    }
  }
  async CreatType(ctx) {
    let body = ctx.request.body;
    console.log(body);
    if (!body.name) {
      ctx.body = {
        code: 0,
        message: "name不存在",
        data: {}
      };
      return;
    }
    try {
      await Type.findOrCreate({
        where: { name: body.name },
        defaults: { name: body.name }
      }).spread((type, created) => {
        if (created === false) {
          ctx.body = {
            code: 0,
            message: `${body.name}已存在`,
            data: {}
          };
        } else {
          ctx.body = {
            code: 1,
            message: "添加成功",
            data: type
          };
        }
      });
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e.message,
        data: {}
      };
    }
  }
}
module.exports = { GoodType: new GoodType() };
