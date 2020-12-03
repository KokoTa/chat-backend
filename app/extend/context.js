/*
 * @Author: KokoTa
 * @Date: 2020-11-03 17:49:01
 * @LastEditTime: 2020-12-03 22:14:00
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/extend/context.js
 */
'use strict';

const { getPageResultVo } = require('../utils');
const QRCode = require('qrcode');

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
  async sendOrSaveMessage(to_id, message) {
    const { id } = this.userInfo;

    /**
     * 多进程下的逻辑
     */
    // 由于多进程模型，当前进程的 app.ws.user 上不一定有这个用户的 socket
    // 通过 redis 获取该用户是否在线，如果在线就可以获取用户所在的进程 pid
    // 对应进程中的 app.ws.user 就有用户的 socket
    const pid = await this.service.cache.get(`online_${id}`);
    if (pid) {
      this.app.messenger.sendTo(pid, 'send', { to_id, message });
    } else {
      if (message.type !== 'system' || message.type !== 'recall') {
        if (message.chat_type === 'user') this.service.cache.setList(`message_offline_${id}_to_user_${to_id}`, message);
        if (message.chat_type === 'group') this.service.cache.setList(`message_offline_${id}_to_group_user_${to_id}`, message);
      }
    }

    /**
     * 单进程下的逻辑
     */
    // // 找到对方的 socket
    // const socket = this.app.ws.user && this.app.ws.user[to_id];
    // // 检查对方是否在线
    // if (socket) {
    //   // 在线就推送消息
    //   socket.send(JSON.stringify({
    //     msg: 'ok',
    //     data: message,
    //   }));
    // } else {
    //   // 不在线就放消息队列(redis)
    //   // type 为 system 为系统消息，recall 为消息撤回，不需要存储到离线消息中
    //   if (message.type !== 'system' || message.type !== 'recall') {
    //     if (message.chat_type === 'user') this.service.cache.setList(`message_offline_${id}_to_user_${to_id}`, message);
    //     if (message.chat_type === 'group') this.service.cache.setList(`message_offline_${id}_to_group_user_${to_id}`, message);
    //   }
    // }

    // 消息撤回需要改动缓存中对应消息的 is_remove 属性，online 和 offline 都要改
    // 但这里出于性能考虑，不建议这样做，可以让前端自己去做判断
    // if (message.type === 'recall') {}
  },
  async getQRCode(text = 'hello word') {
    const url = await QRCode.toDataURL(text);
    return url;
  },
  // 用户上线
  async online(user_id, pid) {
    const key = `online_${user_id}`;
    const oldPid = await this.service.cache.get(key);
    if (oldPid) {
      // 通知对应的进程下线
      this.app.messenger.sendTo(oldPid, 'offline', user_id);
    }
    // 存储上线状态到 redis
    this.service.cache.set(key, pid);
  },
};
