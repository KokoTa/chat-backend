/*
 * @Author: KokoTa
 * @Date: 2020-11-25 09:09:24
 * @LastEditTime: 2020-11-25 09:10:06
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201125010924-fava.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, ENUM, TEXT } = Sequelize;
    // 创建表
    await queryInterface.createTable('fava', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '内容',
      },
      type: {
        type: ENUM,
        values: [ 'emoticon', 'text', 'image', 'video', 'audio', 'card' ],
        allowNull: false,
        defaultValue: 'text',
        comment: '类型',
      },
      options: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '其他参数',
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
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('fava');
  },
};
