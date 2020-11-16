/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/*
 * @Author: KokoTa
 * @Date: 2020-11-16 12:06:25
 * @LastEditTime: 2020-11-16 12:07:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/html/util.js
 */
function randomString(e) {
  e = e || 32;
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length;
  let n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
