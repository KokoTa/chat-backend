/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:38:28
 * @LastEditTime: 2020-11-25 17:22:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/moment.js
 */
'use strict';

const { getPageParams } = require('../utils');

const Service = require('egg').Service;

class MomentService extends Service {
  async momentCreate() {
    const { id } = this.ctx.userInfo;
    const {
      content,
      image,
      video,
      type,
      location,
      remind,
      see,
    } = this.ctx.request.body;

    // 如果不存在对应的对象值，则返回错误
    if (!this.ctx.request.body[type]) this.ctx.throw(400, '10029');

    const moment = await this.ctx.model.Moment.create({
      content,
      image,
      video,
      type,
      location,
      remind,
      see,
      user_id: id,
    });
    if (!moment) this.ctx.throw(400, '10030');

    // 推送到我所有好友的时间轴中
    // 时间轴的作用可以当做很多条平行线，每条线都对应一个用户的时间轴，时间轴上面可以放自己和别人的朋友圈内容
    this.toTimeline(moment);

    this.ctx.apiSuccess();
  }

  async toTimeline(moment) {
    const { id } = this.ctx.userInfo;

    const friends = await this.ctx.model.Friend.findAll({
      where: {
        user_id: id,
        isblack: 0,
      },
    });

    /**
     * 谁可以看
     * all 所有人可见 ['all']
     * only: 1,2,3 指定的人能看 ['only', '1,2,3']
     * except: 1,2,3 指定的人不能看 ['except', '1,2,3']
     * none 只有自己可以看 ['none']
     */
    const seeArr = moment.see.split(':');
    const seeOpt = {
      only: [],
      except: [],
    };
    const seeType = seeArr[0];

    // 如果是 only 或者 except 则需要把后面的字符串拆分成数组
    if (seeType === 'only' || seeType === 'except') {
      const friendIdStr = seeArr[1];
      seeOpt[seeType] = friendIdStr.split(',').map(item => +item);
    }

    // 筛选出能看的朋友们
    const newFriends = friends.filter(friend => {
      let flag = false;
      if (seeType === 'all') flag = true;
      if (seeType === 'only' && seeOpt.includes(friend.friend_id)) flag = true;
      if (seeType === 'except' && !seeOpt.includes(friend.friend_id)) flag = true;
      if (seeType === 'none') flag = false;
      return flag;
    });

    // 对自己和能看的朋友的时间轴推送这条朋友圈
    const timelines = newFriends.map(friend => {
      return {
        user_id: friend.friend_id,
        moment_id: moment.id,
        own: 0,
      };
    });
    timelines.push({
      user_id: id,
      moment_id: moment.id,
      own: 1,
    });
    await this.ctx.model.MomentTimeline.bulkCreate(timelines);
  }

  async momentLike() {
    const { moment_id } = this.ctx.request.body;
    const { id } = this.ctx.userInfo;

    // 我的朋友圈时间轴上能不能找到这条朋友圈，找得到就说明我有资格点赞
    const timeline = await this.ctx.model.MomentTimeline.findOne({
      where: {
        user_id: id,
        moment_id,
      },
    });
    if (!timeline) this.ctx.throw(400, '10031');

    // 我是否点赞了这条朋友圈，找得到就说明我点赞过了
    const like = await this.ctx.model.MomentLike.findOne({
      where: {
        user_id: id,
        moment_id,
      },
    });
    if (like) {
      await like.destroy();
      this.ctx.apiSuccess({}, '取消点赞成功');
    } else {
      await this.ctx.model.MomentLike.create({
        user_id: id,
        moment_id,
      });
      this.ctx.apiSuccess({}, '点赞成功');
    }
  }

  async momentComment() {
    const { moment_id, content, reply_id } = this.ctx.request.body;
    const { id } = this.ctx.userInfo;

    const timeline = this.ctx.model.MomentTimeline.findOne({
      where: {
        user_id: id,
        moment_id,
      },
    });
    if (!timeline) this.ctx.throw(400, '10031');

    await this.ctx.model.MomentComment.create({
      moment_id, content, reply_id, user_id: id,
    });

    this.ctx.apiSuccess({}, '评论成功');
  }

  async momentList() {
    const { id } = this.ctx.userInfo;
    const params = getPageParams(this.ctx.query);

    // 这里的联表关系比较复杂
    const list = await this.ctx.model.MomentTimeline.findAndCountAll({
      ...params,
      where: {
        user_id: id,
      },
      include: [
        {
          model: this.ctx.model.Moment,
          include: [
            {
              model: this.ctx.model.User,
              attributes: [ 'id', 'username', 'nickname', 'avatar' ],
            },
            {
              model: this.ctx.model.MomentLike,
              include: [
                {
                  model: this.ctx.model.User,
                  attributes: [ 'id', 'username', 'nickname' ],
                },
              ],
            },
            {
              model: this.ctx.model.MomentComment,
              include: [
                {
                  model: this.ctx.model.User,
                  as: 'user_model',
                  attributes: [ 'id', 'username', 'nickname' ],
                },
                {
                  model: this.ctx.model.User,
                  as: 'user_reply_model',
                  attributes: [ 'id', 'username', 'nickname' ],
                },
              ],
            },
          ],
        },
      ],
      // order: [
      //   [ 'id', 'desc' ],
      // ],
    });

    // 获取好友
    const friends = await this.ctx.model.Friend.findAll({
      where: {
        user_id: id,
        isblack: 0,
      },
    });

    const friendIds = friends.map(item => item.friend_id);
    friendIds.push(id);

    // 筛掉非好友的点赞和评论
    list.rows = list.rows.map(moment => {
      const likes = [];
      const comments = [];
      moment.moment_model.moment_like_models.forEach(like => {
        friendIds.forEach(friendId => {
          if (like.user_id === friendId) {
            likes.push(like);
          }
        });
      });
      moment.moment_model.moment_comment_models.forEach(comment => {
        friendIds.forEach(friendId => {
          if (comment.user_id === friendId) {
            comments.push(comment);
          }
        });
      });

      const newMoment = JSON.parse(JSON.stringify(moment)); // 查询出来的对象不能直接赋值，所以只能这样深复制一份
      newMoment.moment_model.moment_like_models = likes;
      newMoment.moment_model.moment_comment_models = comments;

      return newMoment;
    });

    return list;
  }
}

module.exports = MomentService;
