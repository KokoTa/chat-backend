/*
 * @Author: KokoTa
 * @Date: 2020-11-09 16:07:15
 * @LastEditTime: 2020-11-10 14:27:29
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/friend.js
 */
'use strict';

const Controller = require('egg').Controller;

class FriendController extends Controller {
  /**
   * @api {get} /api/user/friend 好友列表
   */
  async friendList() {
    const list = await this.ctx.service.friend.friendList();
    this.ctx.apiSuccess(list);
  }

  /**
   * @api {get} /api/user/friend 查看好友资料
   */
  async friendDetail() {
    this.ctx.validate({
      friendId: {
        type: 'int',
        required: true,
      },
    });
    const friend = await this.ctx.service.friend.friendDetail();
    this.ctx.apiSuccess(friend.friend);
  }

  /**
   * @api {post} /api/user/friendBlack 移入/移除黑名单
   */
  async friendBlack() {
    this.ctx.validate({
      friendId: {
        type: 'int',
        required: true,
      },
      isBlack: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
      },
    });
    await this.ctx.service.friend.friendBlack();
    this.ctx.apiSuccess({}, '操作成功');
  }

  /**
   * @api {post} /api/user/friendStar 设置/取消标星好友
   */
  async friendStar() {
    this.ctx.validate({
      friendId: {
        type: 'int',
        required: true,
      },
      isStar: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
      },
    });
    await this.ctx.service.friend.friendStar();
    this.ctx.apiSuccess({}, '操作成功');
  }

  /**
   * @api {get} /api/user/friendMoment 设置朋友圈权限
   */
  async friendMoment() {
    this.ctx.validate({
      friendId: {
        type: 'int',
        required: true,
      },
      lookme: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
      },
      lookhim: {
        type: 'int',
        required: true,
        range: {
          in: [ 0, 1 ],
        },
      },
    });
    await this.ctx.service.friend.friendMoment();
    this.ctx.apiSuccess({}, '操作成功');
  }
}

module.exports = FriendController;
