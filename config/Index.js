const { User } = require('./User')
const { Type } = require('./GoodType')
const { Commodity } = require('./Commodity')
const { Detail } = require('./GoodDetail')
const { DetailType } = require('./DetailType')

Type.hasMany(Commodity)   //分类关联商品
Commodity.hasMany(Detail)   //商品关联商品详情
Detail.hasMany(DetailType)  //商品详情关联详情种类
// DetailType.hasMany(Detail)
// Detail.belongsTo(DetailType)


// User.sync({force:true})
// Type.sync()
// Commodity.sync()
// DetailType.sync()
// Detail.sync()


module.exports = {
    Commodity,
    User,
    Type,
    Detail,
    DetailType
}
