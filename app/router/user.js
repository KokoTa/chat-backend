/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-05 17:06:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/user.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/search', controller.user.search);
  router.post('/api/user/addFriend', controller.apply.addFriend);
};
