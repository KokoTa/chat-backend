/*
 * @Author: KokoTa
 * @Date: 2020-11-11 14:43:22
 * @LastEditTime: 2020-11-19 10:02:01
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
   * @apiParam (body) {Integer} to_id 朋友ID或群聊ID
   * @apiParam (body) {String} chat_type 聊天类型
   * @apiParam (body) {String} type 聊天内容类型
   * @apiParam (body) {String} data 聊天内容
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

    await this.ctx.service.ws.send();
  }

  /**
   * @api {post} /api/ws/createGroup 创建群聊
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (body) {Array} ids 群聊成员ID集合
   */
  async createGroup() {
    // 校验参数
    this.ctx.validate({
      ids: {
        type: 'array',
        required: true,
      },
    });

    await this.ctx.service.ws.createGroup();
  }

  /**
   * @api {get} /api/ws/getOfflineMessage 获取离线消息
   */
  async getOfflineMessage() {
    this.ctx.validate({
      from_id: {
        type: 'int',
        required: true,
      },
      chat_type: {
        type: 'string',
        range: {
          in: [ 'user', 'group' ],
        },
        required: true,
      },
    });
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
}

module.exports = WsController;
