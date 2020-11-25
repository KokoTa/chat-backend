/*
 * @Author: KokoTa
 * @Date: 2020-11-09 16:07:15
 * @LastEditTime: 2020-11-25 10:38:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/friend.js
 */
'use strict';

const Controller = require('egg').Controller;

class FriendController extends Controller {
  /**
   * @api {get} /api/friend 好友列表
   */
  async friendList() {
    const list = await this.ctx.service.friend.friendList();
    this.ctx.apiSuccess(list);
  }

  /**
   * @api {get} /api/friend 查看好友资料
   */
  async friendDetail() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
    });
    const friend = await this.ctx.service.friend.friendDetail();
    this.ctx.apiSuccess(friend);
  }

  /**
   * @api {post} /api/friendBlack 移入/移除黑名单
   */
  async friendBlack() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
      isblack: {
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
   * @api {post} /api/friendStar 设置/取消标星好友
   */
  async friendStar() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
      star: {
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
   * @api {get} /api/friendMoment 设置朋友圈权限
   */
  async friendMoment() {
    this.ctx.validate({
      friend_id: {
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

  /**
   * @api {delete} /api/friendDelete 删除好友
   */
  async friendDelete() {
    this.ctx.validate({
      friend_id: {
        type: 'int',
        required: true,
      },
    });

    const { id } = this.ctx.userInfo;
    const { friend_id } = this.ctx.request.body;

    // 删除我对他的好友关系
    await this.ctx.model.Friend.destroy({
      where: {
        user_id: id,
        friend_id,
      },
    });
    // 删除他对我的好友关系
    await this.ctx.model.Friend.destroy({
      where: {
        user_id: friend_id,
        friend_id: id,
      },
    });

    this.ctx.apiSuccess();
  }
}

module.exports = FriendController;
