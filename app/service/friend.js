/*
 * @Author: KokoTa
 * @Date: 2020-11-09 16:17:19
 * @LastEditTime: 2020-11-10 12:10:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/friend.js
 */
'use strict';

const Service = require('egg').Service;

const SortWord = require('sort-word');


class FriendService extends Service {
  async friendList() {
    const { id } = this.ctx.userInfo;
    let list = await this.ctx.model.Friend.findAndCountAll({
      where: {
        user_id: id,
      },
      include: [{
        model: this.app.model.User,
        as: 'friend',
      }],
    });

    // 通讯录排序，由于只能排序第一层，所以这里要对潜逃数据做上迁操作
    list = list.rows.map(item => {
      item.username = item.friend.username;
      return item;
    });
    list = new SortWord(list, 'username');

    return list;
  }

  async friendDetail() {
    const { friendId } = this.ctx.query;
    const { id: userId } = this.ctx.userInfo;
    const friend = await this.ctx.model.Friend.findOne({
      where: {
        friend_id: friendId,
        user_id: userId,
      },
      include: [{
        model: this.ctx.model.User,
        as: 'friend',
      }],
    });
    if (!friend) this.ctx.throw(400, '好友不存在');
    return friend;
  }

  async friendBlack() {
    const { friendId, isBlack } = this.ctx.request.body;
    const { id: userId } = this.ctx.userInfo;
    const friend = await this.ctx.model.Friend.findOne({
      where: {
        friend_id: friendId,
        user_id: userId,
      },
    });
    if (!friend) this.ctx.throw(400, '10013');
    friend.isblack = isBlack;
    await friend.save();
  }

  async friendStar() {
    const { friendId, isStar } = this.ctx.request.body;
    const { id: userId } = this.ctx.userInfo;
    const friend = await this.ctx.model.Friend.findOne({
      where: {
        friend_id: friendId,
        user_id: userId,
        isblack: 0,
      },
    });
    if (!friend) this.ctx.throw(400, '10014');
    friend.star = isStar;
    await friend.save();
  }

  async friendMoment() {
    const { friendId, lookme, lookhim } = this.ctx.request.body;
    const { id: userId } = this.ctx.userInfo;
    const friend = await this.ctx.model.Friend.findOne({
      where: {
        friend_id: friendId,
        user_id: userId,
        isblack: 0,
      },
    });
    if (!friend) this.ctx.throw(400, '10014');
    friend.lookme = lookme;
    friend.lookhim = lookhim;
    await friend.save();
  }
}

module.exports = FriendService;
