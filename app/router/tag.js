/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-12-03 12:28:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/tag.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 标签操作
  router.post('/api/tag', controller.tag.setTag);
  router.get('/api/tag', controller.tag.getTag);
  router.get('/api/friendTagList', controller.tag.friendTagList);
};
