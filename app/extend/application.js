/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-04 15:57:33
 * @LastEditTime: 2020-11-06 16:46:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/extend/application.js
 */
const crypto = require('crypto');

module.exports = {
  createPassword(val) {
    const hmac = crypto.createHash('sha256', this.config.crypto.secret);
    hmac.update(val);
    return hmac.digest('hex');
  },
  checkPassword(val, targetVal) {
    const hashVal = this.createPassword(val);
    return hashVal === targetVal;
  },
};
