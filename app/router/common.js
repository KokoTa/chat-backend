/*
 * @Author: KokoTa
 * @Date: 2020-11-23 14:11:39
 * @LastEditTime: 2020-11-23 14:30:15
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/common.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 文件上传
  router.post('/api/upload', controller.common.upload);
};
