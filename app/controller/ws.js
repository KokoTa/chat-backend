/*
 * @Author: KokoTa
 * @Date: 2020-11-11 14:43:22
 * @LastEditTime: 2020-12-03 11:44:37
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/ws.js
 */
'use strict';

const Controller = require('egg').Controller;

class WsController extends Controller {
  /**
   * @api {get} /api/ws websocket连接
   * @apiGroup WsGroup
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
   * @apiGroup WsGroup
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
          in: [ 'text', 'image', 'audio', 'video' ], // 还有一些其他类型，比如 system（创建群聊）、recall（撤回消息）
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
   * @apiGroup WsGroup
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
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
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

    await this.ctx.service.ws.getOfflineMessage();
  }

  /**
   * @api {get} /api/ws/getGroupList 获取群聊列表
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async getGroupList() {
    this.ctx.validate({
      pageNo: {
        type: 'int',
        defValue: 1,
      },
      pageSize: {
        type: 'int',
        defValue: 10,
      },
    });

    await this.ctx.service.ws.getGroupList();
  }

  /**
   * @api {get} /api/ws/getGroupDetail 获取群聊详情
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async getGroupDetail() {
    this.ctx.validate({
      group_id: {
        type: 'int',
        required: true,
      },
    });

    await this.ctx.service.ws.getGroupDetail();
  }

  /**
   * @api {put} /api/ws/updateGroupUserNickname 修改群昵称
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async updateGroupUserNickname() {
    this.ctx.validate({
      group_id: {
        type: 'int',
        required: true,
      },
      nickname: {
        type: 'string',
        required: true,
      },
    });

    await this.ctx.service.ws.updateGroupUserNickname();
  }

  /**
   * @api {post} /api/ws/quitGroup 退出和解散群聊
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async quitGroup() {
    this.ctx.validate({
      group_id: {
        type: 'int',
        required: true,
      },
    });

    await this.ctx.service.ws.quitGroup();
  }

  /**
   * @api {post} /api/ws/getGroupQRCode 获取二维码
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async getGroupQRCode() {
    this.ctx.validate({
      group_id: {
        type: 'int',
        required: true,
      },
    });
    const { group_id } = this.ctx.query;
    const url = await this.ctx.getQRCode(JSON.stringify({
      group_id,
    }));
    this.ctx.apiSuccess(url);
  }

  /**
   * @api {post} /api/ws/recall 消息撤回
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async recall() {
    this.ctx.validate({
      to_id: {
        type: 'int',
        required: true,
        desc: '接收人/群 ID',
      },
      id: {
        type: 'int',
        required: true,
        desc: '消息ID',
      },
      chat_type: {
        type: 'string',
        range: {
          in: [ 'user', 'group' ],
        },
        desc: '聊天类型',
      },
    });

    await this.service.ws.recall();
  }

  /**
   * @api {post} /api/ws/kick 将某人踢出群聊
   * @apiGroup WsGroup
   * @apiVersion  1.0.0
   */
  async kick() {
    this.ctx.validate({
      to_id: {
        type: 'int',
        required: true,
        desc: '好友 ID',
      },
      group_id: {
        type: 'int',
        required: true,
        desc: '群 ID',
      },
    });

    await this.service.ws.kick();
  }
}

module.exports = WsController;
