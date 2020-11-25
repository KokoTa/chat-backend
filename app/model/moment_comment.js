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
      comment: '评论用户id',
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '评论内容',
      field: 'content',
    },
    reply_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '回复用户id 0顶级评论',
      field: 'reply_id',
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
    tableName: 'moment_comment',
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
  const MomentCommentModel = sequelize.define('moment_comment_model', attributes, options);

  MomentCommentModel.associate = () => {
    MomentCommentModel.belongsTo(app.model.User, {
      targetKey: 'id',
      foreignKey: 'user_id',
    });
    MomentCommentModel.belongsTo(app.model.User, {
      targetKey: 'id',
      foreignKey: 'reply_id',
    });
  };

  return MomentCommentModel;
};
