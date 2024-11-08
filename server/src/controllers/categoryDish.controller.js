const { CategoryDishService } = require("../services");

const getMostPopular = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageCount = 6 } = req.params;

    const result = await CategoryDishService.getMostPopular(
      pageNumber,
      pageCount
    );
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

const findAll = async (req, res, next) => {
  try {
    const categories = await CategoryDishService.findAll();
    res.status(200).json({
      message: "Find all categories successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMostPopular,
  findAll,
};
