/*
 * @Author: KokoTa
 * @Date: 2020-11-25 09:28:30
 * @LastEditTime: 2020-11-25 09:47:22
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/fava.js
 */
'use strict';

const { getPageParams } = require('../utils');

const Service = require('egg').Service;

class FavaService extends Service {
  async create() {
    const { id } = this.ctx.userInfo;
    const { type, data, options } = this.ctx.request.body;

    const fava = await this.ctx.model.Fava.create({
      type, data, options, user_id: id,
    });
    if (!fava) this.ctx.throw(400, '10028');

    return fava;
  }

  async list() {
    const { id } = this.ctx.userInfo;
    const params = getPageParams(this.ctx.query);

    const list = await this.ctx.model.Fava.findAndCountAll({
      ...params,
      where: {
        user_id: id,
      },
    });

    return list;
  }

  async delete() {
    const { id: userId } = this.ctx.userInfo;
    const { id: favaId } = this.ctx.request.body;

    await this.ctx.model.Fava.destroy({
      where: {
        id: favaId,
        user_id: userId,
      },
    });
  }
}

module.exports = FavaService;
