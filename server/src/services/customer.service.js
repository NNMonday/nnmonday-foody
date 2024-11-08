const { CustomerRepository, DishRepository } = require("../repositories");
const httpErrors = require("http-errors");

const getTotal = async () => {
  try {
    return await CustomerRepository.getTotal();
  } catch (error) {
    throw error;
  }
};

const getCart = async (_id) => {
  try {
    const result = await CustomerRepository.getCart(_id);

    return result.cart;
  } catch (error) {
    throw error;
  }
};

const updateCart = async (_id, newCart) => {
  try {
    const { cart: currentCart = [] } = await CustomerRepository.findCartById(
      _id
    );

    let existingRestaurantId = null;
    if (currentCart.length > 0) {
      const firstDish = await DishRepository.findOneById(
        currentCart[0].dish_id
      );
      if (!firstDish) {
        throw httpErrors.NotFound(
          `Dish with ID ${currentCart[0].dish_id} not found`
        );
      }
      existingRestaurantId = firstDish.restaurant_id.toString();
    }

    for (const newItem of newCart) {
      const isNewItem = !currentCart.some(
        (item) => item.dish_id.toString() === newItem.dish_id.toString()
      );
      if (isNewItem) {
        const newDish = await DishRepository.findOneById(newItem.dish_id);
        if (!newDish) {
          throw httpErrors.NotFound(
            `Dish with ID ${newItem.dish_id} not found`
          );
        }
        const newDishRestaurantId = newDish.restaurant_id.toString();
        if (
          existingRestaurantId &&
          newDishRestaurantId !== existingRestaurantId
        ) {
          throw httpErrors.BadRequest(
            `All items in the cart must be from the same restaurant. '${newDish.name}' could not be added.`
          );
        }
      }
    }

    const data = await CustomerRepository.updateCart(_id, newCart);

    return {
      message: "Your cart has been updated!",
      data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTotal,
  getCart,
  updateCart,
};
