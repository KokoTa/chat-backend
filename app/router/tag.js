/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-10 15:20:38
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/tag.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 添加标签
  router.post('/api/tag', controller.tag.setTag);
};
