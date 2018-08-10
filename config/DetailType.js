const Sequelize = require('sequelize')

const sql = require('./sql')

const DetailType = sql.define('detail_type',{
   type:{
       type: Sequelize.STRING,
       unique: true
   }
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})


module.exports = {
    DetailType
}
