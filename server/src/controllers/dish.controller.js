const { DishService } = require("../services");

const getMostPopular = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageCount = 5 } = req.params;
    const result = await DishService.getMostPopular(pageNumber, pageCount);
    res.status(200).json({
      message: "Find top 5 categories successfully",
      data: {
        items: result,
        currentPage: pageNumber,
        pageSize: pageCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTotal = async (req, res, next) => {
  try {
    const result = await DishService.getTotal();
    res.status(200).json({
      message: "Find total dishes successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const {
      name,
      categoryId,
      cityId,
      districtId,
      wardId,
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const serviceResult = await DishService.find({
      name,
      category_id: categoryId,
      city_id: cityId,
      district_id: districtId,
      ward_id: wardId,
      pageNumber,
      pageSize,
    });

    res.status(200).json({
      message: "Find dishes successfully",
      data: {
        items: serviceResult.data,
        totalPageCount: serviceResult.totalPageCount,
        currentPage: serviceResult.currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMostPopular,
  getTotal,
  find,
};
