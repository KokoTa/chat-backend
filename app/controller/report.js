/*
 * @Author: KokoTa
 * @Date: 2020-11-10 14:11:53
 * @LastEditTime: 2020-11-10 14:58:34
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/controller/report.js
 */
'use strict';

const Controller = require('egg').Controller;

class ReportController extends Controller {
  /**
   * @api {post} /api/user/report 举报好友/群组
   */
  async addReport() {
    this.ctx.validate({
      reported_id: {
        type: 'int',
        required: true,
        desc: '被举报人ID',
      },
      reported_type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'user', 'group' ],
        },
        desc: '举报类型',
      },
      content: {
        type: 'string',
        required: true,
        desc: '举报内容',
      },
      category: {
        type: 'string',
        required: true,
        desc: '分类',
      },
    });
    await this.ctx.service.report.addReport();
    this.ctx.apiSuccess({}, '举报成功');
  }
}

module.exports = ReportController;
