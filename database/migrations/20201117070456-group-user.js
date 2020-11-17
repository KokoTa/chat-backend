/*
 * @Author: KokoTa
 * @Date: 2020-11-17 15:04:56
 * @LastEditTime: 2020-11-17 15:07:00
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201117070456-group-user.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    // 创建表
    await queryInterface.createTable('group_user', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '用户id',
        //  定义外键（重要）
        references: {
          model: 'user', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      group_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '群组id',
        //  定义外键（重要）
        references: {
          model: 'group', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      nickname: {
        type: STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '在群里的昵称',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('group_user');
  },
};
