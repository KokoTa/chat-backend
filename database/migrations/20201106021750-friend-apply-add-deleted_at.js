/*
 * @Author: KokoTa
 * @Date: 2020-11-06 10:17:50
 * @LastEditTime: 2020-11-06 10:18:50
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201106021750-friend-apply-add-deleted_at.js
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
    await queryInterface.addColumn('apply', 'deleted_at', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('friend', 'deleted_at', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('apply', 'deleted_at');
    await queryInterface.removeColumn('friend', 'deleted_at');
  },
};
