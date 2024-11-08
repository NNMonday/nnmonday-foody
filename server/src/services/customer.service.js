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
    const { cart: currentCart } = await CustomerRepository.findCartById(_id);

    let existingRestaurantId = null;
    if (currentCart.length > 0) {
      const currentDish = await DishRepository.findOneById(
        currentCart[0].dish_id
      );
      if (!currentDish) {
        throw httpErrors.NotFound(`Dish with ID ${dish_id} not found`);
      }
      existingRestaurantId = currentDish.restaurant_id.toString();
    }

    const newItem = newCart[newCart.length - 1];
    const { dish_id } = newItem;

    const existingItem = currentCart.find(
      (cartItem) => cartItem.dish_id._id.toString() === dish_id.toString()
    );

    if (!existingItem) {
      const dish = await DishRepository.findOneById(dish_id);
      if (!dish) {
        throw httpErrors.NotFound(`Dish with ID ${dish_id} not found`);
      }

      const dishRestaurantId = dish.restaurant_id.toString();
      if (existingRestaurantId && dishRestaurantId !== existingRestaurantId) {
        throw httpErrors.BadRequest(
          `All items in the cart must be from the same restaurant. '${dish.name}' could not be added.`
        );
      }

      if (!existingRestaurantId) {
        existingRestaurantId = dishRestaurantId;
      }
    }

    let actionMessage;
    if (existingItem) {
      actionMessage = `1 more ${existingItem.dish_id.name} has been added to your cart!`;
    } else {
      const dish = await DishRepository.findOneById(dish_id);
      if (!dish) {
        throw httpErrors.NotFound(`Dish with ID ${dish_id} not found`);
      }
      actionMessage = `${dish.name} has been added to your cart!`;
    }

    const data = await CustomerRepository.updateCart(_id, newCart);

    return {
      message: actionMessage,
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
