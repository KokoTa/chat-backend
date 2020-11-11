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
        model: 'friend_model',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '标签id',
      field: 'tag_id',
      references: {
        key: 'id',
        model: 'tag_model',
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
    tableName: 'friend_tag',
    comment: '',
    indexes: [{
      name: 'friend_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'friend_id' ],
    }, {
      name: 'tag_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'tag_id' ],
    }],
  };
  const FriendTagModel = sequelize.define('friend_tag_model', attributes, options);
  return FriendTagModel;
};
