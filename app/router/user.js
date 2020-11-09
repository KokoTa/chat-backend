/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-09 14:17:51
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
};
