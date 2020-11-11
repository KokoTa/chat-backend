/*
 * @Author: KokoTa
 * @Date: 2020-11-11 14:43:22
 * @LastEditTime: 2020-11-11 15:43:45
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

}

module.exports = WsController;
