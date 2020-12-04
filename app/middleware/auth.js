/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-04 17:25:51
 * @LastEditTime: 2020-12-04 10:12:21
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/middleware/auth.js
 */
module.exports = (option, app) => {
  return async (ctx, next) => {
    // 获取 token
    const { token } = ctx.header;
    if (!token) ctx.throw(401, '10005');
    // 验证并解密 token
    let user = ctx.checkToken(token);
    if (!user) ctx.throw(401, '10006');
    // 判断用户是否登录，如果 redis 没有则说明没登录，如果 redis 有但是和传进来的不一样则说明重复登录(用户 redis token 更新了，但是传进来的是旧 token)
    const redisToken = await ctx.service.cache.get(`user_${user.id}`);
    if (!redisToken || redisToken !== token) ctx.throw(401, '10007');
    // 判断用户是否被禁用
    user = await ctx.model.User.findByPk(user.id);
    if (!user) ctx.throw(400, '10000');
    if (user.status === 0) ctx.throw(400, '10008');
    // 把用户信息挂载到上下文
    ctx.userInfo = user;

    await next();
  };
};
