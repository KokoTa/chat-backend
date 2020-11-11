/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 15:23:14
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/user.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 用户操作
  router.post('/api/register', controller.user.register);
  router.post('/api/login', controller.user.login);
  router.post('/api/logout', controller.user.logout);
  router.get('/api/search', controller.user.search);
};
