/*
 * @Author: KokoTa
 * @Date: 2020-11-17 15:18:12
 * @LastEditTime: 2020-11-17 15:30:17
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/model/group.js
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
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '群组名称',
      field: 'name',
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'avatar',
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '群主id',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'user_model',
      },
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '群公告',
      field: 'remark',
    },
    invite_confirm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '邀请确认',
      field: 'invite_confirm',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '状态',
      field: 'status',
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
    tableName: 'group',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }],
  };
  const GroupModel = sequelize.define('group_model', attributes, options);

  GroupModel.associate = () => {
    // 一对多
    GroupModel.hasMany(app.model.GroupUser);
  };

  return GroupModel;
};
