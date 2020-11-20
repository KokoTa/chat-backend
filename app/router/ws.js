/*
 * @Author: KokoTa
 * @Date: 2020-11-11 14:41:59
 * @LastEditTime: 2020-11-20 17:24:47
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/ws.js
 */
'use strict';

module.exports = app => {
  const { router, ws, controller } = app;

  ws.use(async (ctx, next) => {
    try {
      // 获取参数 ws//..../api/ws?token=xxx
      // 检查 token 有效性
      const { token } = ctx.query;
      if (!token) {
        ctx.websocket.send(JSON.stringify({ msg: '未携带凭证' }));
        return ctx.websocket.close();
      }
      let user = await ctx.checkToken(token);
      if (!user) {
        ctx.websocket.send(JSON.stringify({ msg: '无效的token' }));
        return ctx.websocket.close();
      }
      // 检查用户有效性
      user = await ctx.model.User.findOne({ where: { id: user.id } });
      if (!user) {
        ctx.websocket.send(JSON.stringify({ msg: '用户不存在' }));
        return ctx.websocket.close();
      }
      if (!user.status) {
        ctx.websocket.send(JSON.stringify({ msg: '用户被禁用' }));
        return ctx.websocket.close();
      }

      // 用户上线，上线的用户都放在 app.ws.user 对象中
      app.ws.user = app.ws.user ? app.ws.user : {};
      const userDict = app.ws.user;
      // 下线其他设备连接
      if (userDict[user.id]) {
        userDict[user.id].send(JSON.stringify({ msg: '你的账号在其他设备登录' }));
        userDict[user.id].close();
      }

      // 记录当前用户
      ctx.websocket.user_id = user.id;
      // 记录当前设备连接
      userDict[user.id] = ctx.websocket;
      await next();
    } catch (error) {
      ctx.websocket.send(JSON.stringify({ msg: error }));
      ctx.websocket.close();
    }
  });

  // ws 连接
  ws.route('/api/ws', controller.ws.connect);
  // 发送消息
  router.post('/api/ws/send', controller.ws.send);
  // 创建群聊
  router.post('/api/ws/createGroup', controller.ws.createGroup);
  // 获取离线消息
  router.get('/api/ws/getOfflineMessage', controller.ws.getOfflineMessage);
  // 获取群聊列表
  router.get('/api/ws/getGroupList', controller.ws.getGroupList);
  // 获取群聊详情
  router.get('/api/ws/getGroupDetail', controller.ws.getGroupDetail);
  // 修改群中昵称
  router.put('/api/ws/updateGroupUserNickname', controller.ws.updateGroupUserNickname);
  // 退出和解散群聊
  router.post('/api/ws/quitGroup', controller.ws.quitGroup);
};
