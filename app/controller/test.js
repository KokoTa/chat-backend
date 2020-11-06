/*
 * @Author: KokoTa
 * @Date: 2020-10-29 15:16:28
 * @LastEditTime: 2020-11-04 12:16:57
 * @LastEditors: KokoTa
 * @Description: 旧的参数验证和基础请求测试
 * @FilePath: /uni-wx-be/app/controller/test.js
 */
'use strict';

const { getWhere, getPageResultVo } = require('../utils');

const Controller = require('egg').Controller;

class TestController extends Controller {
  /**
   * 获取用户列表
   */
  async index() {
    this.ctx.validate({
      username: {
        type: 'string',
        required: false,
      },
      pageNo: {
        type: 'int',
        convertType: 'int',
        min: 1,
        required: false,
      },
      pageSize: {
        type: 'int',
        convertType: 'int',
        min: 1,
        required: false,
      },
    }, this.ctx.query);


    const { where, pageNo, pageSize } = getWhere(this.ctx.query);

    const res = await this.app.model.User.findAndCountAll({
      where,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize,
    });

    this.ctx.apiSuccess(getPageResultVo(res, pageNo, pageSize, res.count));
  }

  /**
   * 查询用户详情
   */
  async show() {
    this.ctx.validate({
      id: {
        type: 'int',
        convertType: 'int', // 字符串转为 int 类型后再对比
        min: 1,
        required: true,
      },
    }, this.ctx.params);

    const { id } = this.ctx.params;
    const res = await this.app.model.User.findOne({
      where: {
        id,
      },
    });
    this.ctx.apiSuccess(res);
  }

  /**
   * 新建用户
   */
  async create() {
    const res = await this.app.model.User.create({
      username: 'KokoTa' + Math.random().toString().slice(2, 6),
      password: '123456',
      sex: '女',
    });
    this.ctx.apiSuccess(res);
  }

  /**
   * 更新用户
   */
  async update() {
    this.ctx.validate({
      id: {
        type: 'int',
        convertType: 'int',
        min: 1,
        required: true,
      },
    }, this.ctx.params);

    this.ctx.validate({
      username: {
        type: 'string',
        min: 1,
        max: 11,
        required: true,
      },
      avatar: {
        type: 'string',
        required: true,
      },
      sex: {
        type: 'string',
        required: false,
        default: '男',
      },
    }, this.ctx.request.body);

    const { id } = this.ctx.params;
    const user = await this.app.model.User.findByPk(id);
    if (!user) this.ctx.throw(400, '10000');

    const { body } = this.ctx.request;
    await user.update(body, { fields: [ 'username', 'avatar', 'sex' ] });

    this.ctx.apiSuccess({}, '更新成功');
  }

  /**
   * 删除用户
   */
  async destroy() {
    this.ctx.validate({
      id: {
        type: 'int',
        convertType: 'int',
        min: 1,
        required: true,
      },
    }, this.ctx.params);

    const { id } = this.ctx.params;
    const user = await this.app.model.User.findByPk(id);
    if (!user) this.ctx.throw(400, '10000');

    await user.destroy();

    this.ctx.apiSuccess({}, '删除成功');
  }
}

module.exports = TestController;
