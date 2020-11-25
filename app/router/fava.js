/*
 * @Author: KokoTa
 * @Date: 2020-11-25 09:33:50
 * @LastEditTime: 2020-11-25 09:35:29
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/fava.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 收藏
  router.post('/api/fava/create', controller.fava.create);
  router.get('/api/fava/list', controller.fava.list);
  router.delete('/api/fava/delete', controller.fava.delete);
};
