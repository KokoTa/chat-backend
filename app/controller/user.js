'use strict';

const Controller = require('egg').Controller;

/**
 * @apiDefine UserGroup 用户相关
 */
class UserController extends Controller {

  /**
   * @api {post} /api/user/register 用户注册
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (body) {string} username 用户名
   * @apiParam (body) {string} nickname 昵称
   * @apiParam (body) {string} email 邮箱
   * @apiParam (body) {string} password 密码
   * @apiParam (body) {string} repassword 再次输入密码
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: '注册成功', code: 0, data: {} }
   */
  async register() {
    // 参数验证
    this.ctx.validate({
      username: {
        type: 'string',
        range: {
          min: 5,
          max: 20,
        },
        desc: '用户名',
      },
      nickname: {
        type: 'string',
        desc: '昵称',
      },
      email: {
        type: 'string',
        desc: '邮箱',
      },
      password: {
        type: 'string',
        desc: '密码',
      },
      repassword: {
        type: 'string',
        desc: '再次输入密码',
      },
    }, {
      equals: [
        [ 'password', 'repassword' ],
      ],
    });

    await this.ctx.service.user.register();

    this.ctx.apiSuccess({}, '新建成功');
  }

  /**
   * @api {post} /api/user/login 用户登录
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (body) {string} username 用户名
   * @apiParam (body) {string} password 密码
   *
   * @apiSuccessExample {json} Success-Response:
   *  {
   *    msg: '登录成功',
   *    code: 0,
   *    data: {
   *      "id": 17,
   *      "username": "测试测试8",
   *      "nickname": "昵称测试8",
   *      "email": "邮箱邮箱8",
   *      "avatar": "",
   *      "phone": "",
   *      "sex": "男",
   *      "status": 1,
   *      "sign": "",
   *      "area": "",
   *      "created_at": "2020-11-06T08:43:45.000Z",
   *      "updated_at": "2020-11-06T08:43:45.000Z",
   *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoi5rWL6K-V5rWL6K-VOCIsIm5pY2tuYW1lIjoi5pi156ew5rWL6K-VOCIsImVtYWlsIjoi6YKu566x6YKu566xOCIsImF2YXRhciI6IiIsInBob25lIjoiIiwic2V4Ijoi55S3Iiwic3RhdHVzIjoxLCJzaWduIjoiIiwiYXJlYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIwLTExLTA2VDA4OjQzOjQ1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMS0wNlQwODo0Mzo0NS4wMDBaIiwicGFzc3dvcmQiOiJlMGJjNjBjODI3MTNmNjRlZjhhNTdjMGM0MGQwMmNlMjRmZDAxNDFkNWNjMzA4NjI1OWMxOWIxZTYyYTYyYmVhIiwiaWF0IjoxNjA0NjUyNDY3fQ.7DQKM2tkL9TRr0dEQLez9P8EHW7NlaY-1BHpZZGtstE"
   *    }
   *  }
   */
  async login() {
    // 参数验证
    this.ctx.validate({
      username: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
    });

    const newUser = await this.ctx.service.user.login();

    // 返回用户信息和 token
    this.ctx.apiSuccess(newUser, '登录成功');
  }

  /**
   * @api {post} /api/user/logout 退出登录
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   *    { msg: '退出成功', code: 0, data: {} }
   */
  async logout() {
    // 移除 redis 中用户的 token
    const { id } = this.ctx.userInfo;
    await this.service.cache.remove(`user_${id}`);

    this.ctx.apiSuccess({}, '退出成功');
  }

  /**
   * @api {get} /api/user/search 用户搜索
   * @apiGroup UserGroup
   * @apiVersion  1.0.0
   * @apiParam (query) {string} username 用户名
   * @apiParam (query) {int} pageNo 页码
   * @apiParam (query) {int} pageSize 每页数量
   *
   * @apiSuccessExample {json} Success-Response:
    {
      msg: 'ok',
      code: 0,
      "data": {
        "rows": [
          {
            "id": 14,
            "username": "测试5",
            "nickname": "昵称5",
            "email": "邮箱5",
            "avatar": "",
            "phone": "",
            "sex": "男",
            "status": 1,
            "sign": "",
            "area": "",
            "created_at": "2020-11-04T07:13:14.000Z",
            "updated_at": "2020-11-04T07:13:14.000Z"
          }
        ],
        "page": {
          "pageNo": 1,
          "pageSize": 5,
          "total": 4
        }
      }
    }
   */
  async search() {
    this.ctx.validate({
      username: {
        type: 'string',
      },
      pageNo: {
        type: 'int',
        min: 1,
        required: false,
        defValue: 1,
      },
      pageSize: {
        type: 'int',
        min: 1,
        required: false,
        defValue: 10,
      },
    }, this.ctx.query);


    const res = await this.ctx.service.user.search();
    const { pageNo, pageSize } = this.ctx.query;
    this.ctx.apiPageSuccess(res, pageNo, pageSize, res.count);
  }
}

module.exports = UserController;
