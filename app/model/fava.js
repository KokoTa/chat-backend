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
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '内容',
      field: 'data',
    },
    type: {
      type: DataTypes.ENUM('emoticon', 'text', 'image', 'video', 'audio', 'card'),
      allowNull: false,
      defaultValue: 'text',
      primaryKey: false,
      autoIncrement: false,
      comment: '类型',
      field: 'type',
    },
    options: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '其他参数',
      field: 'options',
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
    tableName: 'fava',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }],
  };
  const FavaModel = sequelize.define('fava_model', attributes, options);
  return FavaModel;
};
