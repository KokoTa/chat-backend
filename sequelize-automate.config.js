/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-03 11:01:30
 * @LastEditTime: 2020-11-25 09:11:20
 * @LastEditors: KokoTa
 * @Description: 配置教程 https://zhuanlan.zhihu.com/p/102026758?utm_source=wechat_session
 * @FilePath: /uni-wx-be/sequelize-automate.config.js
 */
module.exports = {
  dbOptions: {
    database: 'egg',
    username: 'root',
    password: '123456',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false,
  },
  options: {
    type: 'egg',
    dir: './app/model',
    tables: [], // 不指定的话会重新生成所有 model
    emptyDir: false,
  },
};
