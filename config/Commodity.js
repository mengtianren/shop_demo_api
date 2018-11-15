const Sequelize = require("sequelize");
const sql = require("./sql");
const Commodity = sql.define(
  "commodity",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "这是商品名称",
      comment: "这是商品名称"
    },
    price: {
      type: Sequelize.DECIMAL(),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2000
    },
    url: {
      type: Sequelize.STRING,
      defaultValue:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=853096973,2441958914&fm=27&gp=0.jpg",
      comment: "这是商品url",
      validate: {
        isUrl: true
      }
    }
  },
  {
    timestamps: true, //时间更新
    freezeTableName: true //不加s
  }
);

module.exports = {
  Commodity
};
