/*
 * @Author: KokoTa
 * @Date: 2020-11-05 17:05:32
 * @LastEditTime: 2020-11-06 17:39:58
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
   * @api {post} /api/user/addFriend 好友申请
   * @apiGroup ApplyGroup
   * @apiVersion  1.0.0
   * @apiParam (body) {int} friend_id 用户名
   * @apiParam (body) {int} lookme 昵称
   * @apiParam (body) {int} lookhim 邮箱
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: '申请成功', code: 0, data: {} }
   */
  async addFriend() {
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

    const { id } = this.ctx.userInfo;
    const { friend_id, lookme, lookhim } = this.ctx.request.body;
    // 不能添加自己
    if (id === friend_id) this.ctx.throw(400, '10009');
    // 对方是否存在
    const friend = await this.ctx.model.User.findOne({
      where: {
        id: friend_id,
        status: 1,
      },
    });
    if (!friend) this.ctx.throw(400, '10000');
    // 之前是否申请过了
    const apply = await this.ctx.model.Apply.findOne({
      where: {
        user_id: id,
        friend_id,
        status: [ 'pending', 'agree' ],
      },
    });
    if (apply) this.ctx.throw(400, '10010');
    // 创建申请
    const newApply = await this.ctx.model.Apply.create({
      user_id: id,
      friend_id,
      lookme,
      lookhim,
    });
    if (!newApply) this.ctx.throw(400, '10011');

    this.ctx.apiSuccess({}, '申请成功');
  }

  /**
   * 获取好友申请列表
   */
}

module.exports = ApplyController;
