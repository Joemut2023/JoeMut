const { PAGINATION_LIMIT_ADMIN } = require("./utils_const");

/**
 *
 * @param {*} req
 * @returns Object {page,start,end}
 */
module.exports = (req) => {
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let start = (page - 1) * PAGINATION_LIMIT_ADMIN;
  let end = page * PAGINATION_LIMIT_ADMIN;
  return { page, start, end };
};
