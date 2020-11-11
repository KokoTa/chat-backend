define({ "api": [
  {
    "type": "get",
    "url": "/api/apply",
    "title": "好友申请列表",
    "group": "ApplyGroup",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ msg: 'ok', code: 0, data: [] }",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/apply.js",
    "groupTitle": "申请相关",
    "name": "GetApiUserApply"
  },
  {
    "type": "post",
    "url": "/api/apply",
    "title": "好友申请",
    "group": "ApplyGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "friend_id",
            "description": "<p>用户名</p>"
          },
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "lookme",
            "description": "<p>看我(0, 1)</p>"
          },
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "lookhim",
            "description": "<p>看他(0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ msg: '申请成功', code: 0, data: {} }",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/apply.js",
    "groupTitle": "申请相关",
    "name": "PostApiUserApply"
  },
  {
    "type": "put",
    "url": "/api/apply",
    "title": "好友申请处理",
    "group": "ApplyGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>申请id</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>申请状态</p>"
          },
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "lookme",
            "description": "<p>看我(0, 1)</p>"
          },
          {
            "group": "body",
            "type": "int",
            "optional": false,
            "field": "lookhim",
            "description": "<p>看他(0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ msg: '操作成功', code: 0, data: {} }",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/apply.js",
    "groupTitle": "申请相关",
    "name": "PutApiUserApply"
  },
  {
    "type": "get",
    "url": "/api/search",
    "title": "用户搜索",
    "group": "UserGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "query",
            "type": "int",
            "optional": false,
            "field": "pageNo",
            "description": "<p>页码</p>"
          },
          {
            "group": "query",
            "type": "int",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页数量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  msg: 'ok',\n  code: 0,\n  \"data\": {\n    \"rows\": [\n      {\n        \"id\": 14,\n        \"username\": \"测试5\",\n        \"nickname\": \"昵称5\",\n        \"email\": \"邮箱5\",\n        \"avatar\": \"\",\n        \"phone\": \"\",\n        \"sex\": \"男\",\n        \"status\": 1,\n        \"sign\": \"\",\n        \"area\": \"\",\n        \"created_at\": \"2020-11-04T07:13:14.000Z\",\n        \"updated_at\": \"2020-11-04T07:13:14.000Z\"\n      }\n    ],\n    \"page\": {\n      \"pageNo\": 1,\n      \"pageSize\": 5,\n      \"total\": 4\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/user.js",
    "groupTitle": "用户相关",
    "name": "GetApiUserSearch"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "用户登录",
    "group": "UserGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  msg: '登录成功',\n  code: 0,\n  data: {\n    \"id\": 17,\n    \"username\": \"测试测试8\",\n    \"nickname\": \"昵称测试8\",\n    \"email\": \"邮箱邮箱8\",\n    \"avatar\": \"\",\n    \"phone\": \"\",\n    \"sex\": \"男\",\n    \"status\": 1,\n    \"sign\": \"\",\n    \"area\": \"\",\n    \"created_at\": \"2020-11-06T08:43:45.000Z\",\n    \"updated_at\": \"2020-11-06T08:43:45.000Z\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoi5rWL6K-V5rWL6K-VOCIsIm5pY2tuYW1lIjoi5pi156ew5rWL6K-VOCIsImVtYWlsIjoi6YKu566x6YKu566xOCIsImF2YXRhciI6IiIsInBob25lIjoiIiwic2V4Ijoi55S3Iiwic3RhdHVzIjoxLCJzaWduIjoiIiwiYXJlYSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIwLTExLTA2VDA4OjQzOjQ1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMS0wNlQwODo0Mzo0NS4wMDBaIiwicGFzc3dvcmQiOiJlMGJjNjBjODI3MTNmNjRlZjhhNTdjMGM0MGQwMmNlMjRmZDAxNDFkNWNjMzA4NjI1OWMxOWIxZTYyYTYyYmVhIiwiaWF0IjoxNjA0NjUyNDY3fQ.7DQKM2tkL9TRr0dEQLez9P8EHW7NlaY-1BHpZZGtstE\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/user.js",
    "groupTitle": "用户相关",
    "name": "PostApiUserLogin"
  },
  {
    "type": "post",
    "url": "/api/logout",
    "title": "退出登录",
    "group": "UserGroup",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ msg: '退出成功', code: 0, data: {} }",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/user.js",
    "groupTitle": "用户相关",
    "name": "PostApiUserLogout"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "用户注册",
    "group": "UserGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "repassword",
            "description": "<p>再次输入密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ msg: '注册成功', code: 0, data: {} }",
          "type": "json"
        }
      ]
    },
    "filename": "app/controller/user.js",
    "groupTitle": "用户相关",
    "name": "PostApiUserRegister"
  }
] });
