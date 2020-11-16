/* eslint-disable jsdoc/require-param */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-13 15:12:26
 * @LastEditTime: 2020-11-16 15:26:21
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/html/chat.js
 */
class Chat {
  /**
   * 初始化
   */
  constructor(user) {
    const { token, id } = user;
    this.token = token; // 凭证
    this.userId = id; // 用户ID
    this.userInfo = user; // 用户信息
    this.socketUrl = 'ws://localhost:7001/api/ws'; // socket地址
    this.socketSendUrl = 'http://localhost:7001/api/ws/send'; // 消息发送地址
    this.socket = null; // socket实例
    this.isOnline = false; // 是否在线
    this.chatType = 'user'; // 聊天类型
    this.toId = ''; // 当前正在聊天的ID
    this.chatList = []; // 聊天记录
  }

  /**
   * 初始化连接
   */
  connect() {
    if (this.token) {
      this.socketUrl = `${this.socketUrl}?token=${this.token}`;
      this.socket = new WebSocket(this.socketUrl);
      this.socket.onopen = () => this.onopen;
      this.socket.onmessage = msg => this.onmessage(msg);
      this.socket.onclose = () => this.onclose();
      this.socket.onerror = err => this.onerror(err);
      this.isOnline = true;
    } else {
      console.log('没有凭证，无法继续执行');
    }
  }

  /**
   * 监听连接
   */
  onopen() {
    // 用户上线
    console.log('open');
    // 获取离线聊天记录
  }
  onmessage(msg) {
    const { data: message } = JSON.parse(msg.data);
    this.chatList.push(message);
    console.log('接受到的消息: ', message);
  }
  onclose() {
    console.log('close');
    this.isOnline = false;
    this.socket = null;
  }
  onerror(err) {
    console.log(err);
    this.isOnline = false;
    this.socket = null;
  }

  /**
   * 其他操作
   */
  close() {
    this.isOnline = false;
    this.socket.close();
    this.socket = null;
  }
  setToId(id) {
    this.toId = id;
  }
  removeToId() {
    this.toId = null;
  }

  /**
   * 发送消息
   */
  async send(params) {
    const { toId, chatType } = this;
    const { type, data } = params;
    try {
      const result = await axios.post(this.socketSendUrl, {
        to_id: toId,
        chat_type: chatType,
        type,
        data,
      }, {
        headers: {
          token: this.token,
        },
      });
      return result && result.data && result.data;
    } catch (error) {
      return error && error.response && error.response.data;
    }
  }
}
