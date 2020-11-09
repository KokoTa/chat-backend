/*
 * @Author: KokoTa
 * @Date: 2020-11-09 14:47:50
 * @LastEditTime: 2020-11-09 15:52:07
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/apply.js
 */
'use strict';

const { getPageParams } = require('../utils');

const Service = require('egg').Service;

class ApplyService extends Service {
  async addApply() {
    const { id } = this.ctx.userInfo;
    const { friend_id, lookme, lookhim } = this.ctx.request.body;
    // 不能添加自己
    if (id === friend_id) this.ctx.throw(400, '10009');
    // 对方是否存在
    const friend = await this.ctx.model.User.findOne({
      where: {
        id: friend_id,
        status: 1,
      },
    });
    if (!friend) this.ctx.throw(400, '10000');
    // 之前是否申请过了
    const apply = await this.ctx.model.Apply.findOne({
      where: {
        user_id: id,
        friend_id,
        status: [ 'pending', 'agree' ],
      },
    });
    if (apply) this.ctx.throw(400, '10010');
    // 创建申请
    const newApply = await this.ctx.model.Apply.create({
      user_id: id,
      friend_id,
      lookme,
      lookhim,
    });
    if (!newApply) this.ctx.throw(400, '10011');
  }

  async applyList() {
    const { id } = this.ctx.userInfo;
    const params = getPageParams(this.ctx.query);
    const list = await this.ctx.model.Apply.findAndCountAll({
      ...params,
      where: {
        friend_id: id,
        status: 'pending',
      },
      include: [{
        model: this.app.model.User,
        as: 'user',
      }],
    });
    return list;
  }

  async handleApply() {
    // 检查申请是否存在
    const { id: applyId } = this.ctx.request.body;
    const { id: userId } = this.ctx.userInfo;
    const apply = await this.ctx.model.Apply.findOne({
      where: {
        id: applyId,
        friend_id: userId,
        status: 'pending',
      },
    });
    if (!apply) this.ctx.throw(400, '10012');

    // 开启事务
    const transaction = await this.ctx.model.transaction();
    try {
      const { status, lookme, lookhim } = this.ctx.request.body;
      // 更新申请状态
      await apply.update({ status }, { transaction });
      // 同意了才添加好友
      if (status === 'agree') {
        // 检查我有没有在他的列表中
        const existHim = await this.ctx.model.Friend.findOne({
          friend_id: userId,
          user_id: apply.user_id,
        });
        if (!existHim) {
          // 将我加入到他的好友列表
          await this.ctx.model.Friend.create({
            friend_id: userId,
            user_id: apply.user_id,
            lookhim: apply.lookhim,
            lookme: apply.lookme,
          }, { transaction });
        }
        // 检查他有没有在我的列表中
        const existMy = await this.ctx.model.Friend.findOne({
          friend_id: apply.user_id,
          user_id: userId,
        });
        if (!existMy) {
          // 将他加入到我的好友列表
          await this.ctx.model.Friend.create({
            friend_id: apply.user_id,
            user_id: userId,
            lookhim,
            lookme,
          }, { transaction });
        }
      }
      // 提交事务
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      this.ctx.throw(500, error);
    }
  }
}

module.exports = ApplyService;
