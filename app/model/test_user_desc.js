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
      autoIncrement: false,
      comment: null,
      field: 'id',
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'user_id',
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'desc',
    },
  };
  const options = {
    tableName: 'test_user_desc',
    comment: '',
    indexes: [],
  };
  const TestUserDescModel = sequelize.define('test_user_desc_model', attributes, options);
  return TestUserDescModel;
};
