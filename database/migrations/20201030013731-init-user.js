/*
 * @Author: KokoTa
 * @Date: 2020-10-30 09:37:31
 * @LastEditTime: 2020-11-04 10:13:45
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201030013731-init-user.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE, ENUM } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名称', unique: true },
      nickname: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户昵称', unique: true },
      email: { type: STRING(160), allowNull: false, defaultValue: '', comment: '用户邮箱', unique: true },
      password: { type: STRING(200), allowNull: false, defaultValue: '', comment: '用户密码' },
      avatar: { type: STRING(200), allowNull: false, defaultValue: '', comment: '用户头像' },
      phone: { type: STRING(20), allowNull: false, defaultValue: '', comment: '用户手机' },
      sex: { type: ENUM, values: [ '男', '女', '保密' ], allowNull: false, defaultValue: '男', comment: '用户性别' },
      status: { type: INTEGER(1), allowNull: false, defaultValue: 1, comment: '状态 0禁用 1启用' },
      sign: { type: STRING(200), allowNull: false, defaultValue: '', comment: '个性签名' },
      area: { type: STRING(200), allowNull: false, defaultValue: '', comment: '地区' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
  },
};
