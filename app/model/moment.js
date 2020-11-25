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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '朋友圈内容',
      field: 'content',
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '朋友圈图片',
      field: 'image',
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '朋友圈视频',
      field: 'video',
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '位置',
      field: 'location',
    },
    remind: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '提醒谁看',
      field: 'remind',
    },
    see: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'all',
      primaryKey: false,
      autoIncrement: false,
      comment: '谁可以看 all公开 none私密',
      field: 'see',
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
    tableName: 'moment',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }],
  };
  const MomentModel = sequelize.define('moment_model', attributes, options);

  MomentModel.associate = () => {
    // 关联用户，多个朋友圈关联一个用户，所以用 belongsTo，反向一对多，即多对一
    MomentModel.belongsTo(app.model.User, {
      targetKey: 'id',
      foreignKey: 'user_id',
    });
    // 关联点赞
    MomentModel.hasMany(app.model.MomentLike, {
      targetKey: 'id',
      foreignKey: 'moment_id',
    });
    // 关联评论
    MomentModel.hasMany(app.model.MomentComment, {
      targetKey: 'id',
      foreignKey: 'moment_id',
    });
  };

  return MomentModel;
};
