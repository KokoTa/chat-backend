<!--
 * @Author: KokoTa
 * @Date: 2020-10-29 15:07:21
 * @LastEditTime: 2020-11-06 16:43:34
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