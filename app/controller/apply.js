/*
 * @Author: KokoTa
 * @Date: 2020-11-05 17:05:32
 * @LastEditTime: 2020-11-09 15:13:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/apply.js
 */
'use strict';

const Controller = require('egg').Controller;

/**
 * @apiDefine ApplyGroup 申请相关
 */
class ApplyController extends Controller {
  /**
   * @api {post} /api/user/apply 好友申请
   * @apiGroup ApplyGroup
   * @apiVersion  1.0.0
   * @apiParam (body) {int} friend_id 用户名
   * @apiParam (body) {int} lookme 昵称
   * @apiParam (body) {int} lookhim 邮箱
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: '申请成功', code: 0, data: {} }
   */
  async addApply() {
    // 验证参数
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
        desc: '好友ID',
      },
      lookme: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
        desc: '看我',
      },
      lookhim: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
        desc: '看他',
      },
    });

    await this.ctx.service.apply.addApply();

    this.ctx.apiSuccess({}, '申请成功');
  }

  /**
   * @api {get} /api/user/apply 好友申请列表
   * @apiGroup ApplyGroup
   * @apiVersion  1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: 'ok', code: 0, data: [] }
   */
  async applyList() {
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

    const list = await this.ctx.service.apply.applyList();
    const { pageNo, pageSize } = this.ctx.query;

    this.ctx.apiPageSuccess(list, pageNo, pageSize, list.count);
  }

  /**
   * @api {put} /api/user/apply 好友申请处理
   * @apiGroup ApplyGroup
   * @apiVersion  1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: '操作成功', code: 0, data: {} }
   */
  async handleApply() {
    this.ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '申请ID',
      },
      status: {
        type: 'string',
        range: {
          in: [ 'refuse', 'agree', 'ignore' ],
        },
        required: true,
        desc: '申请状态',
      },
      lookme: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
        desc: '看我',
      },
      lookhim: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
        desc: '看他',
      },
    });

    await this.ctx.service.apply.handleApply();

    this.ctx.apiSuccess({}, '操作成功');
  }
}

module.exports = ApplyController;
