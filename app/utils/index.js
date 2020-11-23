/*
 * @Author: KokoTa
 * @Date: 2020-11-02 16:54:17
 * @LastEditTime: 2020-11-23 14:05:16
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /uni-wx-be/app/utils/index.js
 */
/* eslint-disable strict */
module.exports = {
  /**
   * 分离分页参数并返回请求 option
   * @param {Object} obj 参数对象
   */
  getPageParams(obj) {
    const where = { ...obj };
    const { pageNo, pageSize } = where;
    delete where.pageNo;
    delete where.pageSize;
    return {
      where,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize,
    };
  },
  /**
   * 参数合并，让返回结果中带有分页信息
   * @param {*} data 查找出的原始数据
   * @param {*} pageNo 页码
   * @param {*} pageSize 每页的数量
   * @param {*} total 总数量
   */
  getPageResultVo(data, pageNo, pageSize, total) {
    const result = {
      rows: data.rows,
      page: {
        pageNo,
        pageSize,
        total,
      },
    };
    return result;
  },
  // 生成唯一ID
  getRandomID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  },
};
