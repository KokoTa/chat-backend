/*
 * @Author: KokoTa
 * @Date: 2020-11-18 17:44:22
 * @LastEditTime: 2020-11-24 17:51:13
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/ws.js
 */

'use strict';

const { getPageParams } = require('../utils');

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

  async getOfflineMessage() {
    const { from_id, chat_type } = this.ctx.query;
    const { id } = this.ctx.userInfo;

    // 拿的是别人发给我的消息
    let key = '';
    if (chat_type === 'user') key = `message_offline_${from_id}_to_user_${id}`;
    if (chat_type === 'group') key = `message_offline_${from_id}_to_group_user_${id}`;

    // 获取离线消息
    const messages = await this.ctx.service.cache.getList(key);
    if (!messages) this.ctx.throw(400, '10023');
    // 清除离线消息
    // await this.ctx.service.cache.remove(key);

    this.ctx.apiSuccess(messages);
  }

  async getGroupList() {
    const { id } = this.ctx.userInfo;
    const params = getPageParams(this.ctx.query);

    // 查找所有可用群中包含有我的群聊
    const groups = await this.ctx.model.Group.findAndCountAll({
      ...params,
      where: {
        status: 1,
      },
      include: [
        {
          model: this.ctx.model.GroupUser,
          where: {
            user_id: id,
          },
          as: 'group_user',
          attributes: [],
        },
      ],
    });

    const { pageNo, pageSize } = this.ctx.query;
    this.ctx.apiPageSuccess(groups, pageNo, pageSize, groups.count);
  }

  async getGroupDetail() {
    const { id } = this.ctx.userInfo;
    const { group_id } = this.ctx.query;

    const groupDetail = await this.ctx.model.Group.findOne({
      where: {
        id: group_id,
        status: 1,
      },
      include: [
        {
          model: this.ctx.model.GroupUser,
          as: 'group_user',
          where: {
            user_id: id,
          },
          include: [
            {
              model: this.ctx.model.User,
              as: 'user',
            },
          ],
        },
      ],
    });
    if (!groupDetail) this.ctx.throw(400, '10021');
    if (!groupDetail.group_user.length) this.ctx.throw(400, '10022');

    this.ctx.apiSuccess(groupDetail);
  }

  async updateGroupUserNickname() {
    const { id } = this.ctx.userInfo;
    const { group_id, nickname } = this.ctx.request.body;

    const group = await this.ctx.model.Group.findOne({
      where: {
        id: group_id,
        status: 1,
      },
      include: [
        {
          model: this.ctx.model.GroupUser,
          as: 'group_user',
        },
      ],
    });
    if (!group) this.ctx.throw(400, '10021');

    let groupUser = group.group_user;
    if (!groupUser.length) this.ctx.throw(400, '10024');

    const userIndex = groupUser.findIndex(user => user.user_id === id);
    if (userIndex === -1) this.ctx.throw(400, '10022');

    groupUser = await this.ctx.model.GroupUser.findOne({
      where: {
        user_id: id,
      },
    });
    groupUser.nickname = nickname;
    await groupUser.save();

    this.ctx.apiSuccess();
  }

  async quitGroup() {
    const { group_id } = this.ctx.request.body;
    const { id } = this.ctx.userInfo;

    // 检查群聊是否存在
    const group = await this.ctx.model.Group.findOne({
      where: {
        id: group_id,
      },
      include: [
        {
          model: this.ctx.model.GroupUser,
          as: 'group_user',
          include: [
            {
              model: this.ctx.model.User,
              as: 'user',
            },
          ],
        },
      ],
    });
    if (!group) this.ctx.throw(400, '10025');

    // 检查群聊中是否有用户
    const groupUser = group.group_user;
    if (!groupUser.length) this.ctx.throw(400, '10024');

    // 检查用户是否在群聊中
    const userIndex = groupUser.findIndex(user => user.user_id === id);
    if (userIndex === -1) this.ctx.throw(400, '10022');

    // 检查用户是不是群主，是群主就退出并解散，不是群主就只是退出
    if (group.user_id === id) {
      // 对于硬删除来说，由于设置了外键，删除了 group 的同时也会相应删除 groupUser 中的数据
      // 但是由于项目是软删除，因此还是需要逐一删除 groupUser 数据
      await this.ctx.model.Group.destroy({
        where: {
          id: group_id,
        },
      });
      const userIds = groupUser.map(item => item.user.id);
      await this.ctx.model.GroupUser.destroy({
        where: {
          group_id,
          user_id: userIds,
        },
      });
    } else {
      await this.ctx.model.GroupUser.destroy({
        where: {
          group_id,
          user_id: id,
        },
      });
    }

    this.ctx.apiSuccess();
  }

  async recall() {
    const { to_id, id, chat_type } = this.ctx.request.body;
    const { id: userId } = this.ctx.userInfo;

    const message = {
      id,
      from_id: userId,
      to_id,
      chat_type,
      type: 'recall',
    };

    // 单聊
    if (chat_type === 'user') {
      this.ctx.sendOrSaveMessage(userId, message);
      this.ctx.sendOrSaveMessage(to_id, message);
      this.ctx.apiSuccess(message);
      return;
    }

    // 群聊
    if (chat_type === 'group') {
      const group = await this.ctx.model.Group.findOne({
        where: {
          id: to_id,
          status: 1,
        },
        include: [
          {
            model: this.ctx.model.GroupUser,
            as: 'group_user',
          },
        ],
      });
      if (!group) this.ctx.throw(400, '10025');
      if (!group.group_user.length) this.ctx.throw(400, '10024');
      group.group_user.forEach(item => {
        this.ctx.sendOrSaveMessage(item.user_id, message);
      });
      this.ctx.apiSuccess(message);
      return;
    }

    this.ctx.apiFail();
  }
}

module.exports = WsService;

