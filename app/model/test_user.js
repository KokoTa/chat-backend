/*
 * @Author: KokoTa
 * @Date: 2020-11-20 14:48:34
 * @LastEditTime: 2020-11-20 14:57:44
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/model/test_user.js
 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: 'ID',
      field: 'id',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'name',
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'age',
    },
  };
  const options = {
    tableName: 'test_user',
    comment: '',
    indexes: [],
  };
  const TestUserModel = sequelize.define('test_user_model', attributes, options);

  TestUserModel.associate = () => {
    TestUserModel.hasMany(app.model.TestUserDesc, {
      targetKey: 'id',
      foreignKey: 'user_id',
    });
  };

  return TestUserModel;
};
