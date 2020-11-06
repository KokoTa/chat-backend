第一步：解析域名，创建网站
第二步：上传解压
第三步：安装pm2（node环境），切换node版本到最新版本，安装redis
第四步：打开命令行，切换到根目录下
第五步：如果是国内服务器，先切换镜像： 
        npm config set registry https://registry.npm.taobao.org
        如果是国外服务器就不需要了，例如香港服务器
第六步：执行 npm install
第七步：安装数据库迁移工具 npm install --save-dev sequelize-cli
第八步：修改配置信息：
        config/config.default.js
            sequelize配置
            oss配置
        database/config.json
            数据库相关信息
第九步：执行迁移命令 npx sequelize db:migrate
第十步：npm start
第十一步：添加反向代理

添加配置：

```
 location /ws
 {
    proxy_pass http://127.0.0.1:7001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header X-Real-IP $remote_addr;
 }
```



第十二步：修改前端项目的 /common/lib/config.js和manifest.json里面的域名即可