'use strict';

const crypto = require('crypto');

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
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户名称',
      field: 'username',
      unique: 'username',
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户昵称',
      field: 'nickname',
      unique: 'nickname',
    },
    email: {
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户邮箱',
      field: 'email',
      unique: 'email',
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户密码',
      field: 'password',
      set(val) {
        const hmac = crypto.createHash('sha256', app.config.crypto.secret);
        hmac.update(val);
        this.setDataValue('password', hmac.digest('hex'));
      },
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户头像',
      field: 'avatar',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户手机',
      field: 'phone',
    },
    sex: {
      type: DataTypes.ENUM('男', '女', '保密'),
      allowNull: false,
      defaultValue: '男',
      primaryKey: false,
      autoIncrement: false,
      comment: '用户性别',
      field: 'sex',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '状态 0禁用 1启用',
      field: 'status',
    },
    sign: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '个性签名',
      field: 'sign',
    },
    area: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '地区',
      field: 'area',
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
    tableName: 'user',
    comment: '',
    indexes: [],
  };
  const UserModel = sequelize.define('user_model', attributes, options);
  return UserModel;
};
