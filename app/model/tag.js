/*
 * @Author: KokoTa
 * @Date: 2020-11-17 15:19:29
 * @LastEditTime: 2020-12-03 14:49:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/model/tag.js
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
      comment: '标签名称',
      field: 'name',
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '用户id',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'user_model',
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
    tableName: 'tag',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }],
  };
  const TagModel = sequelize.define('tag_model', attributes, options);

  TagModel.associate = () => {
    // 具体解释见 friend 模型
    TagModel.belongsToMany(app.model.Friend, {
      sourceKey: 'id',
      foreignKey: 'tag_id',
      otherKey: 'friend_id',
      targetKey: 'id',
      through: app.model.FriendTag, // 这里传模型对象或者模型名
      as: 'friends',
    });
  };

  return TagModel;
};
