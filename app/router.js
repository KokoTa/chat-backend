/*
 * @Author: KokoTa
 * @Date: 2020-10-29 15:07:21
 * @LastEditTime: 2020-12-10 14:25:41
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/test')(app);
  require('./router/user')(app);
  require('./router/apply')(app);
  require('./router/friend')(app);
  require('./router/report')(app);
  require('./router/tag')(app);
  require('./router/ws')(app);
  require('./router/common')(app);
  require('./router/fava')(app);
  require('./router/moment')(app);
  require('./router/view')(app);
};
