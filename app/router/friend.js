/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 15:23:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/friend.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 好友操作
  router.get('/api/friend', controller.friend.friendList);
  router.get('/api/friendDetail', controller.friend.friendDetail);
  router.post('/api/friendBlack', controller.friend.friendBlack);
  router.post('/api/friendStar', controller.friend.friendStar);
  router.post('/api/friendMoment', controller.friend.friendMoment);
};
