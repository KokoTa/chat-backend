/*
 * @Author: KokoTa
 * @Date: 2020-11-05 14:53:08
 * @LastEditTime: 2020-11-17 15:09:22
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201105065309-apply.js
 */
'use strict';

// 好友申请表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, ENUM } = Sequelize;
    // 创建表
    await queryInterface.createTable('apply', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '申请人id',
        //  定义外键（重要）
        references: {
          model: 'user', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      friend_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '好友id',
        //  定义外键（重要）
        references: {
          model: 'user', // 对应表名称（数据表名称）
          key: 'id', // 对应表的主键
        },
        onUpdate: 'restrict', // 更新时操作
        onDelete: 'cascade', // 删除时操作
      },
      lookme: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1,
        comment: '看我',
      },
      lookhim: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1,
        comment: '看他',
      },
      status: {
        type: ENUM,
        values: [ 'pending', 'refuse', 'agree', 'ignore' ],
        allowNull: false,
        defaultValue: 'pending',
        comment: '申请状态',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('apply');
  },
};
