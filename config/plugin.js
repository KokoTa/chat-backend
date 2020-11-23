/*
 * @Author: KokoTa
 * @Date: 2020-10-29 15:07:21
 * @LastEditTime: 2020-11-23 12:08:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/config/plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },
  // validate: {
  //   enable: false,
  //   package: 'egg-validate',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  websocket: {
    enable: true,
    package: 'egg-websocket-plugin',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
};
