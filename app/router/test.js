/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-04 10:43:24
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/test.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('test', '/api/test', controller.test);
};
