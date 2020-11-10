/*
 * @Author: KokoTa
 * @Date: 2020-11-10 14:12:13
 * @LastEditTime: 2020-11-10 14:59:43
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/report.js
 */
'use strict';

const Service = require('egg').Service;

class ReportService extends Service {
  async addReport() {
    // 不能举报自己
    const { id: userId } = this.ctx.userInfo;
    const { reported_id, reported_type, content, category } = this.ctx.request.body;
    if (userId === reported_id) this.ctx.throw(400, '10015');
    // 检查被举报人是否存在
    const reportUser = await this.ctx.model.User.findOne({
      where: {
        id: reported_id,
        status: 1,
      },
    });
    if (!reportUser) this.ctx.throw(400, '10000');
    // 检查举报人是否已经被举报了
    const report = await this.ctx.model.Report.findOne({
      where: {
        reported_id,
        reported_type,
        status: 'pending',
      },
    });
    if (report) this.ctx.throw(400, '10016');
    // 创建举报
    await this.ctx.model.Report.create({
      user_id: userId,
      reported_id,
      reported_type,
      content,
      category,
    });
  }
}

module.exports = ReportService;
