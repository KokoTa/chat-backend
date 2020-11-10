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
      comment: '用户id',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'user_model',
      },
    },
    reported_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '被举报人id',
      field: 'reported_id',
    },
    reported_type: {
      type: DataTypes.ENUM('user', 'group'),
      allowNull: false,
      defaultValue: 'user',
      primaryKey: false,
      autoIncrement: false,
      comment: '举报类型',
      field: 'reported_type',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '举报内容',
      field: 'content',
    },
    category: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '举报分类',
      field: 'category',
    },
    status: {
      type: DataTypes.ENUM('pending', 'refuse', 'agree'),
      allowNull: false,
      defaultValue: 'pending',
      primaryKey: false,
      autoIncrement: false,
      comment: '举报状态',
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
    tableName: 'report',
    comment: '',
    indexes: [{
      name: 'user_id',
      unique: false,
      type: 'BTREE',
      fields: [ 'user_id' ],
    }],
  };
  const ReportModel = sequelize.define('report_model', attributes, options);

  ReportModel.associate = () => {
    // 设置关联
    ReportModel.belongsTo(app.model.User, { foreignKey: 'user_id', as: 'user' });
  };

  return ReportModel;
};
