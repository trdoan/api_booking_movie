const findAllWithPagination = async (model, currentPage, item) => {
  try {
    const _page = +currentPage || 1;
    const _item = +item || 10;
    const data = await model.findAndCountAll({
      limit: _item,
      offset: (_page - 1) * _item,
      attributes: { exclude: ["password"] },
    });
    const totalPage = Math.ceil(data.count / _item);
    return {
      pagination: {
        totalPage,
        page: _page,
        item: _item,
      },
      data: data.rows,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  findAllWithPagination,
};
