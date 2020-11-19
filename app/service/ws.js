/*
 * @Author: KokoTa
 * @Date: 2020-11-18 17:44:22
 * @LastEditTime: 2020-11-18 17:47:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/ws.js
 */

'use strict';

const Service = require('egg').Service;

class WsService extends Service {
  async send() {
    /**
     * 注意这里的设计，发送消息是包括自己的，这里简化了前端的操作，让前端收到消息后再进行渲染，即只有发送成功才会渲染
     * 否则按照一般套路，前端主动发送消息的人不管消息发送成功与否都要先渲染出来，然后根据返回的相应结果来提示消息发送成功或者失败
     */
    const { id, username, avatar } = this.ctx.userInfo;
    const { to_id, chat_type, type, data } = this.ctx.request.body;

    // 单聊
    if (chat_type === 'user') {
      const friend = await this.ctx.model.Friend.findOne({
        where: {
          user_id: to_id, // to_id 为朋友 ID
          friend_id: id,
          isblack: 0,
        },
        include: [
          {
            model: this.ctx.model.User,
            as: 'user',
          },
          {
            model: this.ctx.model.User,
            as: 'friend',
          },
        ],
      });
      // 好友申请不存在(被拉黑)则报错
      if (!friend) this.ctx.throw(400, '10014');
      // 好友信息不存在或者好友被禁用则报错
      if (!friend.user || friend.user.status !== 1) this.ctx.throw(400, '10000');

      // 构建消息格式
      const message = {
        id: (new Date().getTime()), // 唯一ID，用于撤回消息
        from_id: friend.friend.id,
        from_name: friend.friend.username,
        from_avatar: friend.friend.avatar,
        to_id: friend.user.id,
        to_name: friend.user.username,
        to_avatar: friend.user.avatar,
        chat_type,
        type,
        data,
        options: {},
        is_remove: false,
        created_at: (new Date().getTime()),
      };
      // 记录消息(redis)
      this.service.cache.setList(`message_all_${id}_to_user_${to_id}`, message);
      // 发送或记录为离线消息(redis)
      // 发送给自己
      this.ctx.sendOrSaveMessage(id, message);
      // 发送给对方
      this.ctx.sendOrSaveMessage(to_id, message);
      // 返回成功
      this.ctx.apiSuccess();
    }

    // 群聊
    if (chat_type === 'group') {
      // 验证群聊是否存在
      const group = await this.ctx.model.Group.findOne({
        where: {
          id: to_id, // to_id 为群聊 ID
          status: 1,
        },
        include: [{
          model: this.ctx.model.GroupUser,
          as: 'group_user',
        }],
      });
      if (!group) this.ctx.throw(400, '10021');
      // 验证发送人是否存在于群聊中
      const groupUser = await this.ctx.model.GroupUser.findOne({
        where: {
          user_id: id,
          group_id: group.id,
        },
      });
      if (!groupUser) this.ctx.throw(400, '10022');
      // 发送群聊信息给所有群里的人(包括自己)
      group.group_user.forEach(groupUser => {
        // 构建消息格式
        const message = {
          id: (new Date().getTime()), // 唯一ID，用于撤回消息
          from_id: id,
          from_name: username,
          from_avatar: avatar,
          to_id: groupUser.user_id,
          to_name: groupUser.username,
          to_avatar: groupUser.avatar,
          chat_type,
          type,
          data,
          options: {},
          is_remove: false,
          created_at: (new Date().getTime()),
          group,
        };
        // 记录消息(redis)
        this.service.cache.setList(`message_all_${id}_to_group_user_${groupUser.user_id}`, message);
        // 发送或记录为离线消息(redis)
        this.ctx.sendOrSaveMessage(groupUser.user_id, message);
      });
      this.ctx.apiSuccess(group);
    }
  }

  async createGroup() {
    const { id: userId } = this.ctx.userInfo;
    const { ids } = this.ctx.request.body;

    const transaction = await this.ctx.model.transaction();
    try {
      // 验证是否为好友
      const friends = await this.ctx.model.Friend.findAll({
        where: {
          user_id: userId,
          friend_id: ids,
        },
        include: [
          {
            model: this.ctx.model.User,
            as: 'friend',
          },
          {
            model: this.ctx.model.User,
            as: 'user',
          },
        ],
      }, { transaction });
      if (!friends.length) this.ctx.throw(400, '10013');

      // 创建群聊
      let name = friends.map(item => {
        return item.friend.username;
      }).join(',');
      name = `${friends[0].user.username},${name}`;
      const group = await this.ctx.model.Group.create({
        name,
        avatar: '群聊头图',
        user_id: userId,
      }, { transaction });
      if (!group) this.ctx.throw(400, '10019');

      // 群聊加入用户
      const bulkData = friends.map(item => {
        return {
          user_id: item.friend.id,
          group_id: group.id,
        };
      });
      bulkData.unshift({
        user_id: userId,
        group_id: group.id,
      });
      const groupUser = await this.ctx.model.GroupUser.bulkCreate(bulkData, { transaction });
      if (!groupUser) this.ctx.throw(400, '10020');

      // 提交事务
      await transaction.commit();

      // 推送消息给群成员
      const message = {
        id: (new Date().getTime()), // 唯一ID，用于撤回消息
        from_id: this.ctx.userInfo.id,
        from_name: this.ctx.userInfo.username,
        from_avatar: this.ctx.userInfo.avatar,
        to_id: group.id,
        to_name: group.name,
        to_avatar: group.avatar,
        chat_type: 'group',
        type: 'system',
        data: '创建群聊成功，可以开始聊天啦',
        options: {},
        is_remove: false,
        created_at: (new Date().getTime()),
        group,
      };
      bulkData.forEach(item => {
        this.ctx.sendOrSaveMessage(item.user_id, message);
      });
      this.ctx.apiSuccess(group);
    } catch (error) {
      await transaction.rollback();
      this.ctx.throw(500, error);
    }
  }
}

module.exports = WsService;

