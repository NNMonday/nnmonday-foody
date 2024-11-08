const { RestaurantService } = require("../services");

const getMostPopular = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageCount = 6 } = req.params;

    const result = await RestaurantService.getMostPopular(
      pageNumber,
      pageCount
    );
    res.status(200).json({
      message: "Find top 5 restaurants successfully",
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
    const result = await RestaurantService.getTotal();
    res.status(200).json({
      message: "Find total restaurants successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMostPopular,
  getTotal,
};