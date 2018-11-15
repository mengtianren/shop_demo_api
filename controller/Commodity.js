const { Commodity } = require("../config/Commodity");

class GoodCommodity {
  async CreateCommodity(ctx) {
    let body = ctx.request.body;
    if (!body.type_id) {
      ctx.body = {
        code: 0,
        message: "type_id不存在",
        data: {}
      };
      return;
    }
    try {
      await Commodity.findOrCreate({
        where: { name: body.name },
        defaults: {
          name: body.name,
          price: body.price || 10,
          number: body.number || 100,
          type_id: body.type_id
        }
      }).spread((commodity, create) => {
        if (create === false) {
          ctx.body = {
            code: 0,
            message: "该商品已存在",
            data: commodity
          };
        } else {
          ctx.body = {
            code: 0,
            message: `${body.name}已入库`,
            data: commodity
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
  async FindCommodity(ctx) {
    let body = ctx.request.body;
    if (!body.type_id) {
      let whole = await Commodity.findAll();
      ctx.body = {
        code: 1,
        message: "获取全部商品成功",
        data: whole
      };
      return;
    }
    try {
      let type = await Commodity.findAll({
        where: { type_id: body.type_id }
        // limit: body.limit
      });
      ctx.body = {
        code: 1,
        message: "获取成功",
        data: type
      };
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e.message,
        data: []
      };
    }
  }
}

module.exports = { GoodCommodity: new GoodCommodity() };
