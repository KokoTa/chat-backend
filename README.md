<!--
 * @Author: KokoTa
 * @Date: 2020-10-29 15:07:21
 * @LastEditTime: 2020-11-11 12:30:31
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /uni-wx-be/README.md
-->
# api



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### 建表流程

1. 用 [sequelize-cli](https://itbilu.com/nodejs/npm/VyqgRUVf7.html) 生成数据库和数据表，但是有个大问题，无法直接实现表结构更新，需要新建一个 migration 才能更新，具体见 [这里](https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn)
2. 用 [sequelize-automate](https://zhuanlan.zhihu.com/p/102026758?utm_source=wechat_session) 生成实体文件
3. [sequelize中文文档](https://www.bookstack.cn/read/sequelize-5.x-zh/Readme.md)

### 动态SQL的实现

```js
const result = await this.ctx.model.query(
  `select * from user where 1=1
  ${username ? 'and username=?' : ''}
  ${nickname ? 'and nickname=?' : ''}
  ${email ? 'and email=?' : ''}
  ${id ? 'and id=?' : ''}`,
  {
    replacements: [ username, nickname, email, id ],
    type: QueryTypes.SELECT,
  }
);
this.ctx.apiSuccess(result);
```

### 模型字段操作

```js
// 对密码进行 hash 加密，该加密是不可逆的
const hmac = crypto.createHash('sha256', app.config.crypto.secret);
hmac.update(val);
this.setDataValue('password', hmac.digest('hex'));
```

### 表设计

一般不用外键，但是该项目比较简单，可以用外键来快速关联

```js
// 外键权限的说明： http://blog.sina.com.cn/s/blog_91339bff0100ymc2.html
user_id: {
  type: INTEGER(20).UNSIGNED,
  allowNull: false,
  comment: '用户id',
  //  定义外键（重要）
  references: {
    model: 'user', // 对应表名称（数据表名称）
    key: 'id', // 对应表的主键
  },
  onUpdate: 'restrict', // 更新时操作，字表有值则父表不能更新
  onDelete: 'cascade', // 删除时操作，父表删除则子表也删除
},
```

### 设置关联关系

```js
FriendModel.associate = () => {
  // 设置一对多，这里的外键指的是属表的外键
  // 这里 foreignKey 指的是 friend 表的外键 friend_id
  FriendModel.belongsTo(app.model.User, { foreignKey: 'friend_id', as: 'friend' });
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
```

注意：`sequelize.define(name, attributes, options)` 中的 name 最好要和表名一致，否则会影响到关联查询

比如 User 的 name 为 `user_model`，则关联查询时会有 `"Unknown column 'apply_model.user_model_id' in 'on clause'"` 的错误，因为这里如果不设置 { foreignKey: 'user_id' }，则默认会用 user_model_id 作为查询条件
