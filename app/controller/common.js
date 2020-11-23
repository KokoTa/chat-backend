/*
 * @Author: KokoTa
 * @Date: 2020-11-23 14:00:22
 * @LastEditTime: 2020-11-23 14:38:27
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/common.js
 */
'use strict';

const { getRandomID } = require('../utils');

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');

class CommonController extends Controller {
  async upload() {
    if (!this.ctx.request.files) {
      this.ctx.throw(400, '10026');
    }

    const file = this.ctx.request.files[0];
    const name = `egg-oss-demo/${getRandomID(10)}${path.extname(file.filename)}`;

    let result = null;
    try {
      result = await this.ctx.oss.put(name, file.filepath);
    } catch (error) {
      this.ctx.throw(500, error);
    } finally {
      await fs.unlink(file.filepath);
    }

    if (!result) this.ctx.throw(400, '10027');

    this.ctx.apiSuccess(result.url);
  }
}

module.exports = CommonController;
