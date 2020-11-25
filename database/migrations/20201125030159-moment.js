/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:01:59
 * @LastEditTime: 2020-11-25 11:03:04
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201125030159-moment.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize;
    // 创建表
    await queryInterface.createTable('moment', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '朋友圈内容',
      },
      image: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '朋友圈图片',
      },
      video: {
        type: STRING,
        allowNull: false,
        defaultValue: '',
        comment: '朋友圈视频',
      },
      location: {
        type: STRING,
        allowNull: false,
        defaultValue: '',
        comment: '位置',
      },
      remind: {
        type: STRING,
        allowNull: false,
        defaultValue: '',
        comment: '提醒谁看',
      },
      see: {
        type: STRING,
        allowNull: false,
        defaultValue: 'all',
        comment: '谁可以看 all公开 none私密',
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
    await queryInterface.dropTable('moment');
  },
};
