/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:30:07
 * @LastEditTime: 2020-11-25 15:48:34
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/moment.js
 */
'use strict';

const Controller = require('egg').Controller;

class MomentController extends Controller {
  /**
   * @api {post} /api/momentCreate 发布朋友圈
   */
  async momentCreate() {
    this.ctx.validate({
      content: {
        type: 'string',
        required: false,
        defValue: '',
        desc: '内容',
      },
      image: {
        type: 'string',
        required: false,
        defValue: '',
        desc: '图片',
      },
      video: {
        type: 'string',
        required: false,
        defValue: '',
        desc: '视频',
      },
      type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'content', 'image', 'video' ],
        },
      },
      location: {
        type: 'string',
        required: false,
        desc: '位置',
      },
      remind: {
        type: 'string',
        required: false,
        desc: '提醒谁看',
      },
      see: {
        type: 'string',
        required: false,
        defValue: 'all', // 默认所有人都能看
        desc: '谁可以看',
      },
    });

    await this.ctx.service.moment.momentCreate();
  }

  /**
   * @api {post} /api/momentLike 点赞朋友圈
   */
  async momentLike() {
    this.ctx.validate({
      moment_id: {
        type: 'int',
        required: true,
        desc: '朋友圈ID',
      },
    });

    await this.ctx.service.moment.momentLike();
  }

  /**
   * @api {post} /api/momentComment 评论朋友圈
   */
  async momentComment() {
    this.ctx.validate({
      moment_id: {
        type: 'int',
        required: true,
      },
      content: {
        type: 'string',
        required: true,
      },
      reply_id: {
        type: 'int',
        required: false,
      },
    });

    await this.ctx.service.moment.momentComment();
  }

  /**
   * @api {get} /api/momentList 朋友圈列表
   */
  async momentList() {
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

    const list = await this.ctx.service.moment.momentList();
    const { pageNo, pageSize } = this.ctx.query;

    this.ctx.apiPageSuccess(list, pageNo, pageSize, list.count);
  }
}

module.exports = MomentController;
