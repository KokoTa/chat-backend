/*
 * @Author: KokoTa
 * @Date: 2020-11-25 11:06:36
 * @LastEditTime: 2020-11-25 11:27:28
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/model/moment_like.js
 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id',
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '点赞用户id',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'user_model',
      },
    },
    moment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '朋友圈消息id',
      field: 'moment_id',
      references: {
        key: 'id',
        model: 'moment_model',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_at',
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'deleted_at',
    },
  };
  const options = {
    tableName: 'moment_like',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }, {
      name: 'moment_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'moment_id' ],
    }],
  };
  const MomentLikeModel = sequelize.define('moment_like_model', attributes, options);

  MomentLikeModel.associate = () => {
    MomentLikeModel.belongsTo(app.model.User, {
      targetKey: 'id',
      foreignKey: 'user_id',
    });
  };

  return MomentLikeModel;
};
