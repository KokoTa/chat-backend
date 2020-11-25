/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:02:10
 * @LastEditTime: 2020-11-25 11:03:43
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201125030210-moment_like.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize;
    // 创建表
    await queryInterface.createTable('moment_like', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '点赞用户id',
        //  定义外键（重要）
        references: {
          model: 'user', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      moment_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '朋友圈消息id',
        //  定义外键（重要）
        references: {
          model: 'moment', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('moment_like');
  },
};
