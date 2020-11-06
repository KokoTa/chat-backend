安装egg.js

```
全局切换镜像： 
npm config set registry https://registry.npm.taobao.org
```



我们推荐直接使用脚手架，只需几条简单指令，即可快速生成项目（`npm >=6.1.0`）:

```
mkdir egg-example && cd egg-example
npm init egg --type=simple --registry https://registry.npm.taobao.org
npm i
```

启动项目:

```
npm run dev
open http://localhost:7001
```

# 写第一个api接口

## 安装vscode扩展
## 创建控制器

```js
async index() {
    const { ctx } = this;
    // 获取路由get传值参数（路由:id）
    ctx.params;
    // 获取url的问号get传值参数
    ctx.query;
    // 响应
    ctx.body = '响应';
    // 状态码
	ctx.status = 201;
}
```



## 编写路由

### 基础用法

```js
// router.js
router.get('/admin/:id', controller.admin.index);

// controller
async index() {
    const { ctx } = this;
    // 获取路由get传值参数（路由:id）
    ctx.params;
    // 获取url的问号get传值参数
    ctx.query;
}
```

### 资源路由

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/api/posts', controller.posts);
  // app/controller/v1/users.js
  router.resources('users', '/api/v1/users', controller.v1.users); 
};
```

上面代码就在 `/posts` 路径上部署了一组 CRUD 路径结构，对应的 Controller 为 `app/controller/posts.js` 接下来， 你只需要在 `posts.js` 里面实现对应的函数就可以了。

| Method | Path            | Route Name | Controller.Action             |
| ------ | --------------- | ---------- | ----------------------------- |
| GET    | /posts          | posts      | app.controllers.posts.index   |
| GET    | /posts/new      | new_post   | app.controllers.posts.new     |
| GET    | /posts/:id      | post       | app.controllers.posts.show    |
| GET    | /posts/:id/edit | edit_post  | app.controllers.posts.edit    |
| POST   | /posts          | posts      | app.controllers.posts.create  |
| PUT    | /posts/:id      | post       | app.controllers.posts.update  |
| DELETE | /posts/:id      | post       | app.controllers.posts.destroy |

```js
// app/controller/posts.js

// 列表页
exports.index = async () => {};
// 新增表单页
exports.new = async () => {};
// 新增逻辑
exports.create = async () => {};
// 详情页
exports.show = async () => {};
// 编辑表单页
exports.edit = async () => {};
// 更新逻辑
exports.update = async () => {};
// 删除逻辑
exports.destroy = async () => {};
```

### 路由分组

```js
// app/router.js
module.exports = app => {
  require('./router/news')(app);
  require('./router/admin')(app);
};

// app/router/news.js
module.exports = app => {
  app.router.get('/news/list', app.controller.news.list);
  app.router.get('/news/detail', app.controller.news.detail);
};

// app/router/admin.js
module.exports = app => {
  app.router.get('/admin/user', app.controller.admin.user);
  app.router.get('/admin/log', app.controller.admin.log);
};
```



# 关闭csrf开启跨域

文档：https://www.npmjs.com/package/egg-cors

- 安装  npm i egg-cors --save
- 配置插件

```js
// {app_root}/config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```

- config / config.default.js 目录下配置

```js
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
     // 跨域白名单
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };
```

# 数据库

## 配置和创建迁移文件

### 配置



1. 安装并配置[egg-sequelize](https://github.com/eggjs/egg-sequelize)插件（它会辅助我们将定义好的 Model 对象加载到 app 和 ctx 上）和[mysql2](https://github.com/sidorares/node-mysql2)模块：

```js
npm install --save egg-sequelize mysql2
```

2. 在`config/plugin.js`中引入 egg-sequelize 插件

```
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
```

3. 在`config/config.default.js`

```js
config.sequelize = {
    dialect:  'mysql',
    host:  '127.0.0.1',
    username: 'root',
    password:  'root',
    port:  3306,
    database:  'eggapi',
    // 中国时区
    timezone:  '+08:00',
    define: {
        // 取消数据表名复数
        freezeTableName: true,
        // 自动写入时间戳 created_at updated_at
        timestamps: true,
        // 字段生成软删除时间戳 deleted_at
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 所有驼峰命名格式化
        underscored: true
    }
};
```

4. sequelize 提供了[sequelize-cli](https://github.com/sequelize/cli)工具来实现[Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)，我们也可以在 egg 项目中引入 sequelize-cli。

```js
npm install --save-dev sequelize-cli
```

5.  egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在`database`目录下，所以我们在项目根目录下新建一个`.sequelizerc`配置文件：

```js
'use strict';

const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

6. 初始化 Migrations 配置文件和目录

```js
npx sequelize init:config
npx sequelize init:migrations
// npx sequelize init:models
```

7. 行完后会生成`database/config.json`文件和`database/migrations`目录，我们修改一下`database/config.json`中的内容，将其改成我们项目中使用的数据库配置：

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "eggapi",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00"
  }
}
```

8. 创建数据库

```js
npx sequelize db:create
```

### 创建数据迁移表

```js
npx sequelize migration:generate --name=init-user
```

1.执行完命令后，会在database / migrations / 目录下生成数据表迁移文件，然后定义

```js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, STRING, DATE, ENUM } = Sequelize;
        // 创建表
        await queryInterface.createTable('user', {
            id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
            username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名称', unique: true},
            password: { type: STRING(200), allowNull: false, defaultValue: '' },
            avatar_url: { type: STRING(200), allowNull: true, defaultValue: '' },
            sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '男', comment: '用户性别'},
            created_at: DATE,
            updated_at: DATE
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('user')
    }
};
```

- 执行 migrate 进行数据库变更

```php
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```



# 模型

### 创建模型

```js
// app / model / user.js

'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // 配置（重要：一定要配置详细，一定要！！！）
  const User = app.model.define('user', {
    id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名称', unique: true},
      password: { type: STRING(200), allowNull: false, defaultValue: '' },
      avatar_url: { type: STRING(200), allowNull: true, defaultValue: '' },
      sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '男', comment: '用户性别'},
      created_at: DATE,
      updated_at: DATE
  },{
    timestamps: true, // 是否自动写入时间戳
    tableName: 'user', // 自定义数据表名称
 });

  return User;
};
```

这个 Model 就可以在 Controller 和 Service 中通过 `app.model.User` 或者 `ctx.model.User` 访问到了，例如我们编写 `app/controller/user.js`：

```js
// app/controller/user.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    let keyword = this.ctx.params.keyword;
    let Op = this.app.Sequelize.Op;
    ctx.body = await ctx.model.User.findAll({ 
        where:{
            id:{
                [Op.gt]:6
            },
            username: {
              	[Op.like]:'%'+keyword+'%'
            }
        },
        attributes:['id','username','sex'],
        order:[
            ['id','DESC']
        ],
        limit: toInt(ctx.query.limit), 
        offset: toInt(ctx.query.offset) 
    });
  }

  async show() {
    let id = parseInt(this.ctx.params.id);
      // 通过主键查询单个数据
      // let detail = await this.app.model.User.findByPk(id);
      // if (!detail) {
      //     return this.ctx.body = {
      //         msg: "fail",
      //         data: "用户不存在"
      //     }
      // }

      // 查询单个
      let detail = await this.app.model.User.findOne({
          where: {
              id,
              sex: "女"
          }
      });

      this.ctx.body = {
          msg: 'ok',
          data: detail
      };
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    // 创建单条记录
    const user = await ctx.model.User.create({ name, age });
    // 批量创建
    await ctx.model.User.bulkCreate([{
        name: "第一个",
        age: 15
    },
    {
        name: "第二个",
        age: 15
    },
    {
        name: "第三个",
        age: 15
    }]);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
```

最后我们将这个 controller 挂载到路由上：

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('user', '/user', controller.user);
};
```

针对 `users` 表的 CURD 操作的接口就开发完了







# 错误和异常处理

```js
// app/middleware/error_handler.js
module.exports = (option, app) => {
    return async function errorHandler(ctx, next) {
      try {
        await next();
      } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
  
        const status = err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;
  
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = { error };
        if (status === 422) {
          ctx.body.detail = err.errors;
        }
        ctx.status = status;
      }
    };
  };
```



# 中间件

```js
config.middleware = ['errorHandler'];

config.errorHandler = {
    ceshi: 123,
    // 通用配置（以下是重点）
    enable:true, // 控制中间件是否开启。
    match:'/news', // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    ignore:'/shop' // 设置符合某些规则的请求不经过这个中间件。

    /**
        注意：
        1. match 和 ignore 不允许同时配置
        2. 例如：match:'/news'，只要包含/news的任何页面都生效
        **/

    // match 和 ignore 支持多种类型的配置方式：字符串、正则、函数（推荐）
    match(ctx) {
        // 只有 ios 设备才开启
        const reg = /iphone|ipad|ipod/i;
        return reg.test(ctx.get('user-agent'));
    },
};
```



# 参数验证

https://www.npmjs.com/package/egg-valparams

```
npm i egg-valparams --save
```

```js
// config/plugin.js
valparams : {
  enable : true,
  package: 'egg-valparams'
},
// config/config.default.js
config.valparams = {
    locale    : 'zh-cn',
    throwError: false
};
```

```js
class XXXController extends app.Controller {
  // ...
  async XXX() {
    const {ctx} = this;
    ctx.validate({
      system  : {type: 'string', required: false, defValue: 'account', desc: '系统名称'},
      token   : {type: 'string', required: true, desc: 'token 验证'},
      redirect: {type: 'string', required: false, desc: '登录跳转'}
    });
    // if (config.throwError === false)
    if(ctx.paramErrors) {
      // get error infos from `ctx.paramErrors`;
    }
    let params = ctx.params;
    let {query, body} = ctx.request;
    // ctx.params        = validater.ret.params;
    // ctx.request.query = validater.ret.query;
    // ctx.request.body  = validater.ret.body;
    // ...
    ctx.body = query;
  }
  // ...
}
```



