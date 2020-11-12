/*
 * @Author: KokoTa
 * @Date: 2020-11-09 14:47:46
 * @LastEditTime: 2020-11-12 12:11:40
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/user.js
 */
'use strict';

const { getPageParams } = require('../utils');

const Service = require('egg').Service;

class UserService extends Service {
  async register() {
    // 检查用户是否已存在
    const { username, nickname, email } = this.ctx.request.body;
    const { Op } = this.ctx.model.Sequelize;
    const user = await this.ctx.model.User.findOne({
      where: {
        [Op.or]: [{ username }, { nickname }, { email }],
      },
    });
    if (user) this.ctx.throw(400, '10001');

    // 新建用户，validate 已经过滤掉了多余的参数，可以省略解构操作
    await this.ctx.model.User.create(this.ctx.request.body);
  }

  async login() {
    // 验证用户是否存在，用户状态是否启用
    const { username, password } = this.ctx.request.body;
    const user = await this.ctx.model.User.findOne({
      where: {
        username,
        status: 1,
      },
      attributes: {
        include: [ 'password' ], // 由于全局配置过滤掉了 password，因此这里要加回来
      },
    });
    if (!user) this.ctx.throw(400, '10000');

    // 用户密码校验
    const checkPasswordFlag = this.app.checkPassword(password, user.password);
    if (!checkPasswordFlag) this.ctx.throw(400, '10003');

    // 生成 token，user 不是纯对象，需要转化
    const newUser = { ...user.dataValues };
    const token = this.ctx.getToken(newUser);
    newUser.token = token;
    delete newUser.password;

    // 加入缓存
    const redisRes = await this.service.cache.set(`user_${user.id}`, token);
    if (!redisRes) this.ctx.throw(400, '10004');

    return newUser;
  }

  async search() {
    const { Op } = this.ctx.model.Sequelize;
    const params = getPageParams(this.ctx.query);

    const { id, username } = params.where;
    const where = {};
    if (id) where.id = id;
    if (username) where.username = { [Op.like]: `%${params.where.username}%` };

    const res = await this.app.model.User.findAndCountAll({
      ...params,
      where,
    });
    return res;
  }
}

module.exports = UserService;
