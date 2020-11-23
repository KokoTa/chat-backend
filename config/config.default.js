/*
 * @Author: KokoTa
 * @Date: 2020-10-29 15:07:21
 * @LastEditTime: 2020-11-23 14:35:18
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/config/config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // 关闭 CSRF，这个选项是后端渲染才会用到
    security: {
      csrf: {
        enable: false,
      },
    },
    // 跨域配置
    cors: {
      origin: '*',
      allowMethods: 'GET, PUT, POST, DELETE, PATCH',
    },
    // 数据库配置
    sequelize: {
      dialect: 'mysql', // 设置语法类型
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      port: 3306,
      database: 'egg',
      timezone: '+08:00', // 中国时区
      define: {
        // 取消数据表明复数
        freezeTableName: true,
        // 自动写入时间戳
        timestamps: true,
        // 字段生产软删除时间戳,
        paranoid: true,
        // 是否开启下划线策略
        underscored: true,
        // sequelize 的自动写入时间戳和软删除默认都是用驼峰的，由于项目统一使用下划线规则，所以需要配置转换策略（underscored 这个选项对自动写入和软删除无效，所以需要额外配置）
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 全局设置某些字段不返回
        defaultScope: {
          attributes: { exclude: [ 'password', 'deleted_at' ] },
        },
      },
    },
    // 参数校验配置
    valparams: {
      locale: 'zh-cn',
      throwError: true,
    },
    // 加密配置
    crypto: {
      secret: 'KokoTa',
    },
    // jwt配置
    jwt: {
      secret: 'KokoTa',
    },
    // reids配置
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    },
    // 阿里云 oss 配置
    multipart: {
      mode: 'file',
    },
    oss: {
      client: {
        accessKeyId: 'LTAI4FySnp2emp6ePaYN1ywb',
        accessKeySecret: 'cWY03GhwToGPlCm9Mn2ehL7YPOQVsZ',
        bucket: 'kokota',
        endpoint: 'oss-cn-guangzhou.aliyuncs.com',
        timeout: '60s',
      },
    },
    // 错误处理，可以用中间件来实现，但是中间件无法完全捕获所有错误（比如无法捕获 json 解析错误）
    onerror: {
      all(err, ctx) {
        ctx.status = 500;
        ctx.body = JSON.stringify({
          msg: err,
          code: -9999,
          data: {},
        });
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603955168287_5052';

  // add your middleware config here
  config.middleware = [ 'errorHandle', 'auth' ];

  // 中间件配置
  config.errorHandle = {
    enable: true,
    match: '/api',
  };
  config.auth = {
    enable: true,
    ignore: [
      '/api/register',
      '/api/login',
      /swagger/,
      /^\/api\/ws$/,
      '/api/upload',
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
