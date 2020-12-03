/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-12-03 20:53:09
 * @LastEditTime: 2020-12-03 22:15:57
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app.js
 */
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
    // 应用已经启动完毕
    const { app } = this;
    // 监听发来的主动下线事件，由 `app/extend/context.js -> online` 方法触发
    app.messenger.on('offline', user_id => {
      const socket = app.ws.user && app.ws.user[user_id];
      // 下线其他设备连接
      if (socket) {
        socket.send(JSON.stringify({ msg: '你的账号在其他设备登录' }));
        socket.close();
      }
    });
    // 监听发来的发送消息事件，由 `app/extend/context.js -> sendOrSaveMessage` 方法触发
    app.messenger.on('send', ({ to_id, message }) => {
      const socket = app.ws.user && app.ws.user[to_id];
      if (socket) {
        socket.send(JSON.stringify({
          msg: 'ok',
          data: message,
        }));
      }
    });
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }
}

module.exports = AppBootHook;
