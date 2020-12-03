/*
 * @Author: KokoTa
 * @Date: 2020-11-10 15:19:26
 * @LastEditTime: 2020-12-03 12:24:34
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/tag.js
 */
'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  /**
   * @api {post} /api/tag 新增好友标签
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
   * @api {get} /api/tag 获取我新增的所有标签
   */
  async getTag() {
    const result = await this.ctx.service.tag.getTag();
    this.ctx.apiSuccess(result);
  }

  /**
   * @api {get} /api/friendTagList 获取好友标签
   */
  async friendTagList() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
    });

    const result = await this.ctx.service.tag.friendTagList();
    this.ctx.apiSuccess(result, '操作成功');
  }
}

module.exports = TagController;
