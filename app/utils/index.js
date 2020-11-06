/* eslint-disable strict */
module.exports = {
  /**
   * 参数分离，分离出分页参数和条件参数
   * @param {Object} obj 参数对象
   */
  getWhere(obj) {
    const where = { ...obj };
    const { pageNo = 1, pageSize = 5 } = where;
    delete where.pageNo;
    delete where.pageSize;
    return {
      where,
      pageNo,
      pageSize,
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
};
