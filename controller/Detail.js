const { Detail } = require("../config/GoodDetail");
const { DetailType } = require("../config/DetailType");

class GoodDetail {
  async CreateDetail(ctx) {
    let body = ctx.request.body;
    if (!body.commodity_id) {
      ctx.body = {
        code: 0,
        message: "commodity_id不存在",
        data: ""
      };
      return;
    }
    try {
      let detail = await Detail.create({
        commodity_id: body.commodity_id,
        type: body.type
      });
      ctx.body = {
        code: 1,
        message: "添加成功",
        data: detail
      };
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e.message,
        data: {}
      };
    }
  }
  async FindDetail(ctx) {
    let body = ctx.request.body;
    if (!body.commodity_id) {
      ctx.body = {
        code: 0,
        message: "commodity_id不存在",
        data: []
      };
      return;
    }
    try {
      let detail = await Detail.findAll({
        where: { commodity_id: body.commodity_id },
        include: { model: DetailType }
      });
      ctx.body = {
        code: 1,
        message: "获取详情成功",
        data: detail
      };
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e.message,
        data: []
      };
    }
  }
  async CreateDetailType(ctx) {
    let body = ctx.request.body;
    // if(!body.detail_id){
    //     ctx.body = {
    //         code: 0,
    //         message: 'detail_id不存在',
    //         data: {}
    //     }
    //     return
    // }
    try {
      await DetailType.findOrCreate({
        where: { type: body.type },
        defaults: { type: body.type }
      }).spread((type, create) => {
        if (create === false) {
          ctx.body = {
            code: 0,
            message: "已存在",
            data: type
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

module.exports = {
  GoodDetail: new GoodDetail()
};
