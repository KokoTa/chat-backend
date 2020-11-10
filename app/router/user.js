/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 12:11:45
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/user.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 用户操作
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.get('/api/user/search', controller.user.search);
  // 申请操作
  router.post('/api/user/apply', controller.apply.addApply);
  router.get('/api/user/apply', controller.apply.applyList);
  router.put('/api/user/apply', controller.apply.handleApply);
  // 好友操作
  router.get('/api/user/friend', controller.friend.friendList);
  router.get('/api/user/friendDetail', controller.friend.friendDetail);
  router.post('/api/user/friendBlack', controller.friend.friendBlack);
  router.post('/api/user/friendStar', controller.friend.friendStar);
  router.post('/api/user/friendMoment', controller.friend.friendMoment);
};
