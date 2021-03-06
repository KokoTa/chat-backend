/*
 * @Author: KokoTa
 * @Date: 2020-11-09 16:07:15
 * @LastEditTime: 2020-12-04 10:30:19
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

    // 删除好友申请
    await this.ctx.model.Apply.destroy({
      where: {
        user_id: id,
        friend_id,
      },
    });

    // 删除朋友圈记录
    this.friendTimelineDelete(friend_id, id);
    this.friendTimelineDelete(id, friend_id);

    this.ctx.apiSuccess();
  }

  /**
   * @api {delete} /api/friendTimelineDelete 删除非好友朋友圈时间轴记录
   */
  async friendTimelineDelete(friend_id, user_id) {
    // 找到朋友发的朋友圈
    const moments = await this.ctx.model.findAll({
      where: {
        user_id: friend_id,
      },
    });
    const momentIds = moments.map(moment => moment.id);

    // 删除我时间轴中关于他的记录
    await this.ctx.model.MomentTimeline.destroy({
      where: {
        user_id,
        moment_id: momentIds,
      },
    });
  }
}

module.exports = FriendController;
