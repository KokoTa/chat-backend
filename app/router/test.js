/*
 * @Author: KokoTa
 * @Date: 2020-10-29 16:36:28
 * @LastEditTime: 2020-11-17 12:09:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router/test.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('test', '/api/test', controller.test);
  router.get('/api/rawSqlGetApplyWithUser', controller.test.rawSqlGetApplyWithUser);
  router.put('/api/rawSqlUpdateUser', controller.test.rawSqlUpdateUser);
  router.post('/api/rawSqlAddUser', controller.test.rawSqlAddUser);
  router.delete('/api/rawSqlSoftDelUser', controller.test.rawSqlSoftDelUser);
  router.delete('/api/rawSqlDelUser', controller.test.rawSqlDelUser);
};
