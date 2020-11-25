/*
 * @Author: KokoTa
 * @Date: 2020-11-25 09:16:09
 * @LastEditTime: 2020-11-25 09:46:52
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/fava.js
 */

'use strict';

const Controller = require('egg').Controller;

class FavaController extends Controller {
  /**
   * @api {post} /api/fava/create 创建收藏
   */
  async create() {
    this.ctx.validate({
      type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'text', 'image', 'video', 'audio', 'emoticon', 'card' ],
        },
        desc: '消息类型',
      },
      data: {
        type: 'string',
        required: true,
        desc: '消息内容',
      },
      options: {
        type: 'string',
        required: true,
      },
    });

    const result = await this.ctx.service.fava.create();

    this.ctx.apiSuccess(result);
  }

  /**
   * @api {get} /api/fava/list 收藏列表
   */
  async list() {
    this.ctx.validate({
      pageNo: {
        type: 'int',
        required: false,
        defValue: 1,
      },
      pageSize: {
        type: 'int',
        required: false,
        defValue: 10,
      },
    }, this.ctx.query);

    const list = await this.ctx.service.fava.list();
    const { pageNo, pageSize } = this.ctx.query;

    this.ctx.apiPageSuccess(list, pageNo, pageSize, list.count);
  }

  /**
   * @api {delete} /api/fava/delete 删除收藏
   */
  async delete() {
    this.ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '收藏ID',
      },
    });

    await this.ctx.service.fava.delete();

    this.ctx.apiSuccess();
  }
}

module.exports = FavaController;

