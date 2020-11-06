/* eslint-disable strict */

const errorCode = require('../config/errorCode');

/*
 * @Author: KokoTa
 * @Date: 2020-11-03 11:30:11
 * @LastEditTime: 2020-11-04 16:15:40
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/middleware/errorHandle.js
 */
module.exports = (option, app) => {
  return async (ctx, next) => {
    try {
      await next();
      // 404 错误处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.apiFail({}, '404错误');
      }
    } catch (err) {
      const { status, message } = err;
      ctx.logger.error(err); // 记录错误日志
      if (errorCode[message]) { // 尝试获取自定义错误
        ctx.apiFail({}, errorCode[message], status, +message);
      } else if (err.errors) { // 尝试获取错误栈
        ctx.apiFail({}, err.errors, status);
      } else { // 获取原始错误信息
        ctx.apiFail({}, message, status);
      }
    }
  };
};
