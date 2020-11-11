/*
 * @Author: KokoTa
 * @Date: 2020-11-11 11:41:26
 * @LastEditTime: 2020-11-11 11:42:15
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/database/migrations/20201111034126-friend-tag-apply-add-deleted_at.js
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
    await queryInterface.addColumn('tag', 'deleted_at', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('friend_tag', 'deleted_at', {
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
    await queryInterface.removeColumn('tag', 'deleted_at');
    await queryInterface.removeColumn('friend_tag', 'deleted_at');
  },
};
