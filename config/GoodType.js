const Sequelize = require("sequelize");
const sql = require("./sql");
const Type = sql.define(
  "type",
  {
    name: {
      type: Sequelize.STRING(15),
      allowNull: false,
      defaultValue: "全部",
      comment: "这是分类接口"
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  }
);
module.exports = { Type };
