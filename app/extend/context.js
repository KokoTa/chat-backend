/*
 * @Author: KokoTa
 * @Date: 2020-11-03 17:49:01
 * @LastEditTime: 2020-11-09 09:28:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/extend/context.js
 */
'use strict';

const { getPageResultVo } = require('../utils');

module.exports = {
  apiSuccess(data = {}, msg = 'ok', status = 200, code = 0) {
    this.status = status;
    this.body = { msg, code, data };
  },
  apiPageSuccess(data = [], pageNo = 1, pageSize = 10, total = 0) {
    const vo = getPageResultVo(data, pageNo, pageSize, total);
    this.status = 200;
    this.body = { msg: 'ok', code: 0, data: vo };
  },
  apiFail(data = {}, msg = 'fail', status = 400, code = -1) {
    this.status = status;
    this.body = { msg, code, data };
  },
  getToken(val) {
    return this.app.jwt.sign(val, this.app.config.jwt.secret);
  },
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
};
