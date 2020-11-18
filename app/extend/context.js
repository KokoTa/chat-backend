/*
 * @Author: KokoTa
 * @Date: 2020-11-03 17:49:01
 * @LastEditTime: 2020-11-18 16:05:56
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/extend/context.js
 */
'use strict';

const { getPageResultVo } = require('../utils');

module.exports = {
  apiSuccess(data = {}, msg = 'ok', status = 200, code = 0) {
    this.status = status;
    this.body = { msg, code, data };
  },
  apiPageSuccess(data = [], pageNo = 1, pageSize = 10, total = 0) {
    const vo = getPageResultVo(data, pageNo, pageSize, total);
    this.status = 200;
    this.body = { msg: 'ok', code: 0, data: vo };
  },
  apiFail(data = {}, msg = 'fail', status = 400, code = -1) {
    this.status = status;
    this.body = { msg, code, data };
  },
  getToken(val) {
    return this.app.jwt.sign(val, this.app.config.jwt.secret);
  },
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
  // 发送或记录为离线消息(redis)
  sendOrSaveMessage(to_id, message) {
    // 找到对方的 socket
    const { id } = this.userInfo;
    const socket = this.app.ws.user && this.app.ws.user[to_id];
    // 检查对方是否在线
    if (!socket) {
      // 不在线就放消息队列(redis)
      if (message.chat_type === 'user') this.service.cache.setList(`message_offline_${id}_to_user_${to_id}`, message);
      if (message.chat_type === 'group') this.service.cache.setList(`message_offline_${id}_to_group_user_${to_id}`, message);
    } else {
      // 在线就推送消息
      socket.send(JSON.stringify({
        msg: 'ok',
        data: message,
      }));
    }
  },
};
