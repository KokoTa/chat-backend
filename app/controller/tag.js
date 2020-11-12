/*
 * @Author: KokoTa
 * @Date: 2020-11-10 15:19:26
 * @LastEditTime: 2020-11-12 16:55:11
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/tag.js
 */
'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  /**
   * @api {post} /api/tag 新增标签
   */
  async setTag() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
      tags: {
        type: 'string',
        required: true,
      },
    });
    const result = await this.ctx.service.tag.setTag();
    this.ctx.apiSuccess(result, '操作成功');
  }

  /**
   * @api {get} /api/tag 获取标签
   */
  async getTag() {
    const result = await this.ctx.service.tag.getTag();
    this.ctx.apiSuccess(result);
  }
}

module.exports = TagController;
