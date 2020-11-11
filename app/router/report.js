/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 15:23:31
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/report.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 举报操作
  router.post('/api/report', controller.report.addReport);
};
