const Sequelize = require('sequelize')

const sql = require('./sql')

const Detail = sql.define('detail',{
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})


module.exports = {
    Detail
}
