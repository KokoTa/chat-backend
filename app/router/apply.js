/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 15:22:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/apply.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 申请操作
  router.post('/api/apply', controller.apply.addApply);
  router.get('/api/apply', controller.apply.applyList);
  router.put('/api/apply', controller.apply.handleApply);
};
