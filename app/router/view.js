/*
 * @Author: KokoTa
 * @Date: 2020-12-10 14:18:28
 * @LastEditTime: 2020-12-10 14:25:27
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/view.js
 */

'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 用户操作
  router.get('/view/index', controller.view.index);
};
