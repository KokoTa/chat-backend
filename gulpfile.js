/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-06 11:40:22
 * @LastEditTime: 2020-11-06 12:09:46
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/gulpfile.js
 */
const { watch, series } = require('gulp');
const run = require('gulp-run');
const apidoc = require('gulp-apidoc');


function doc(cb) {
  apidoc({
    src: './app/controller',
    dest: './doc',
  }, cb);
}

exports.default = () => {
  run('serve ./doc').exec();
  watch('./app/controller/**', series(doc));
};

