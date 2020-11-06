'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "name",
      unique: "name"
    }
  };
  const options = {
    tableName: "SequelizeMeta",
    comment: "",
    indexes: []
  };
  const SequelizeMetaModel = sequelize.define("SequelizeMeta_model", attributes, options);
  return SequelizeMetaModel;
};