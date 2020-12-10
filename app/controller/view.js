/*
 * @Author: KokoTa
 * @Date: 2020-12-10 14:19:18
 * @LastEditTime: 2020-12-10 19:59:27
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/view.js
 */
'use strict';

const Controller = require('egg').Controller;

class ViewController extends Controller {
  async index() {
    const users = await this.ctx.model.User.findAll();
    this.ctx.session.userId = 123;
    this.ctx.session.userName = 'KokoTa';
    await this.ctx.render('index.nj', { users });
  }
}

module.exports = ViewController;
