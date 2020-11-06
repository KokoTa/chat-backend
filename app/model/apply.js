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
      comment: '申请人id',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'user_model',
      },
    },
    friend_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '好友id',
      field: 'friend_id',
      references: {
        key: 'id',
        model: 'user_model',
      },
    },
    lookme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '看我',
      field: 'lookme',
    },
    lookhim: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '看他',
      field: 'lookhim',
    },
    status: {
      type: DataTypes.ENUM('pending', 'refuse', 'agree', 'ignore'),
      allowNull: false,
      defaultValue: 'pending',
      primaryKey: false,
      autoIncrement: false,
      comment: '申请状态',
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
    tableName: 'apply',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }, {
      name: 'friend_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'friend_id' ],
    }],
  };
  const ApplyModel = sequelize.define('apply_model', attributes, options);
  return ApplyModel;
};
