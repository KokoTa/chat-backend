/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-25 11:35:19
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/friend.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 好友操作
  router.get('/api/friend', controller.friend.friendList);
  router.get('/api/friend/friendDetail', controller.friend.friendDetail);
  router.post('/api/friend/friendBlack', controller.friend.friendBlack);
  router.post('/api/friend/friendStar', controller.friend.friendStar);
  router.post('/api/friend/friendMoment', controller.friend.friendMoment);
  router.delete('/api/friend/friendDelete', controller.friend.friendDelete);
};
