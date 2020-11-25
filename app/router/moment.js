/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:32:42
 * @LastEditTime: 2020-11-25 15:50:20
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/moment.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/moment/momentCreate', controller.moment.momentCreate);
  router.post('/api/moment/momentLike', controller.moment.momentLike);
  router.post('/api/moment/momentComment', controller.moment.momentComment);
  router.get('/api/moment/momentList', controller.moment.momentList);
};
