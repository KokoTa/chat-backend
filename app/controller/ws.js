/*
 * @Author: KokoTa
 * @Date: 2020-11-11 14:43:22
 * @LastEditTime: 2020-11-17 18:10:02
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/ws.js
 */
'use strict';

const Controller = require('egg').Controller;

class WsController extends Controller {
  /**
   * @api {get} /api/ws websocket连接
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (query) {String} token token字符串
   */
  async connect() {
    // 无效访问
    if (!this.ctx.websocket) {
      this.ctx.throw(400, '10017');
    }

    this.ctx.websocket
      .on('message', msg => {
        console.log('接受消息', msg);
      })
      .on('close', (code, reason) => {
        console.log('用户下线', code, reason);
        // app.ws.user 存放了所有在线用户的 id 及对应的设备连接
        const { user_id } = this.ctx.websocket;
        const userDict = this.app.ws.user;
        if (userDict && userDict[user_id]) {
          delete userDict[user_id];
        }
      });
  }

  /**
   * @api {post} /api/ws/send 发送消息
   * @apiDescription 虽然可以直接通过 socket.send 发送消息，但是为了方便和代码清晰，另外写了一个 api 来实现
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (query) {String} token token字符串
   * @apiParam (body) {String} token token字符串
   */
  async send() {
    // 验证参数
    this.ctx.validate({
      to_id: {
        type: 'int',
        required: true,
        desc: '聊天人/群ID',
      },
      chat_type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'user', 'group' ],
        },
        desc: '聊天类型',
      },
      type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'text', 'image', 'audio', 'video' ],
        },
        desc: '聊天内容类型',
      },
      data: {
        type: 'string',
        required: true,
        desc: '聊天内容',
      },
    });

    const { id } = this.ctx.userInfo;
    const { to_id, chat_type, type, data } = this.ctx.request.body;

    // 单聊
    if (chat_type === 'user') {
      const friend = await this.ctx.model.Friend.findOne({
        where: {
          user_id: to_id, // 这里是传入朋友的 ID，即检查是否他给你发送过好友申请
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
        opitons: {},
        is_remove: false, // 是否撤回
        created_at: (new Date().getTime()),
      };
      // 记录历史消息(redis)
      this.service.cache.setList(`message_all_${id}_to_${to_id}`, message);
      // 找到对方的 socket
      const socket = this.app.ws.user && this.app.ws.user[to_id];
      // 检查对方是否在线
      if (!socket) {
        // 不在线就放消息队列(redis)
        this.service.cache.setList(`message_offline_${id}_to_${to_id}`, message);
      } else {
        // 在线就推送消息
        socket.send(JSON.stringify({
          msg: 'ok',
          data: message,
        }));
      }
      // 返回成功
      this.ctx.apiSuccess(message);
    }
  }

  /**
   * @api {post} /api/ws/createGroup 创建群聊
   */
  async createGroup() {
    // 校验参数
    this.ctx.validate({
      ids: {
        type: 'array',
        required: true,
      },
    });
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
        ],
      }, { transaction });
      if (!friends.length) this.ctx.throw(400, '10013');

      // 创建群聊
      const name = friends.map(item => {
        return item.friend.username;
      }).join(',');
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
      this.ctx.apiSuccess();
    } catch (error) {
      await transaction.rollback();
      this.ctx.throw(500, error);
    }
  }

}

module.exports = WsController;
