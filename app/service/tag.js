/*
 * @Author: KokoTa
 * @Date: 2020-11-10 15:18:30
 * @LastEditTime: 2020-11-12 16:54:58
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/service/tag.js
 */
'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async setTag() {
    const { id: userId } = this.ctx.userInfo;
    const { friend_id, tags } = this.ctx.request.body;
    // 检查好友是否存在
    const friend = await this.ctx.model.Friend.findOne({
      where: {
        user_id: userId,
        friend_id,
        isblack: 0,
      },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
        },
      ],
    });
    if (!friend) this.ctx.throw(400, '10014');

    const transaction = await this.ctx.model.transaction();
    try {
      // 过滤出新标签
      const tagList = tags.split(',');
      const existTags = await this.ctx.model.Tag.findAll({
        where: {
          user_id: userId,
        },
      }, { transaction });
      const existNames = existTags.map(item => item.name);
      const noExistNames = tagList.filter(name => !existNames.includes(name));
      // 添加新标签
      await this.ctx.model.Tag.bulkCreate(noExistNames.map(name => ({
        name,
        user_id: userId,
      })), { transaction });

      // 获取传入的标签
      const tagResult = await this.ctx.model.Tag.findAll({
        where: {
          name: tagList,
        },
      }, { transaction });
      // 添加新标签，删除旧标签，比如旧标签 1 2 3，传入 2 3 4，则要删 1 增 4，变为 2 3 4
      const oldIds = friend.tags.map(item => item.id);
      const newIds = tagResult.map(item => item.id);
      const addIds = newIds.filter(id => !oldIds.includes(id));
      const delIds = oldIds.filter(id => !newIds.includes(id));
      console.log(oldIds, newIds);
      console.log(addIds, delIds);

      // 新增关联关系
      await this.ctx.model.FriendTag.bulkCreate(addIds.map(id => ({
        friend_id: friend.id,
        tag_id: id,
      })), { transaction });
      // 删除关联关系
      await this.ctx.model.FriendTag.destroy({
        where: {
          friend_id: friend.id,
          tag_id: delIds,
        },
      }, { transaction });

      transaction.commit();
    } catch (error) {
      transaction.rollback();
      this.ctx.throw(500, error);
    }
  }

  async getTag() {
    const tagList = await this.ctx.model.Tag.findAll();
    return tagList;
  }
}

module.exports = TagService;
