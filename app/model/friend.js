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
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '是否为星标朋友：0否1是',
      field: 'star',
    },
    isblack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '是否加入黑名单：0否1是',
      field: 'isblack',
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
    tableName: 'friend',
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
  const FriendModel = sequelize.define('friend_model', attributes, options);

  FriendModel.associate = () => {
    // 设置一对多，这里的外键指的是属表的外键
    // 这里 foreignKey 指的是 friend 表的外键 friend_id
    FriendModel.belongsTo(app.model.User, { foreignKey: 'friend_id', as: 'friend' });
    // 这里 foreignKey 指的是 friend 表的外键 user_id
    FriendModel.belongsTo(app.model.User, { foreignKey: 'user_id', as: 'user' });
    // 设置多对多，多对多一般都有中间表，这里的外键指的都是中间表的外键
    // sourceKey 指的是 friend 表的连接键
    // foreignKey 指的是 friend_tag 表的外键 friend_id
    // otherKey 指的是 friend_tag 表的外键 tag_id
    // targetKey 指的是 tag 表的连接键
    FriendModel.belongsToMany(app.model.Tag, {
      sourceKey: 'id',
      foreignKey: 'friend_id',
      otherKey: 'tag_id',
      targetKey: 'id',
      through: app.model.FriendTag, // 这里传模型对象或者模型名
      as: 'tags',
    });
  };

  return FriendModel;
};
