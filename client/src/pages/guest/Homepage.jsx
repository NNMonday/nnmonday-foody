import React, { useEffect, useState } from "react";
import { banner } from "../../assets/imgs";
import { AxiosInstance } from "../../configs";
import { Link } from "react-router-dom";
import { paths } from "../../utils/magic";
import { getParamPath } from "../../utils/helpers";

const CategoryItem = ({
  image,
  name,
  restaurantCount,
  dishCount,
  category_id,
}) => (
  <Link
    className="border-2 overflow-hidden rounded-xl hover:border-primary"
    to={paths.menu.url + `?categoryDishId=${category_id}`}
  >
    <img src={image} alt="image" />
    <div className="py-3 px-6">
      <p className="font-bold text-xl">{name}</p>
      <p className="text-primary font-medium">{restaurantCount} Restaurants</p>
      <p className="text-primary font-medium">{dishCount} Dishes</p>
    </div>
  </Link>
);

const RestaurantItem = ({ userAvatar, userName, restaurant_id }) => (
  <Link
    className="border-2 overflow-hidden rounded-xl hover:border-black"
    to={getParamPath(paths.restaurantDetail.url, restaurant_id)}
  >
    <img src={userAvatar} alt="image" />
    <p className="font-bold text-xl py-3 px-6 text-center text-white bg-primary">
      {userName}
    </p>
  </Link>
);

const Section = ({ index, title, items }) => (
  <div className="mt-10">
    <p className="font-bold text-3xl mb-7">{title}</p>
    <div className="flex gap-5">
      {items.map((item, i) =>
        index === 0 ? (
          <CategoryItem key={i} {...item} />
        ) : index === 1 ? (
          <RestaurantItem key={i} {...item} />
        ) : null
      )}
    </div>
  </div>
);

export default function Homepage() {
  const [sectionOptions, setSectionOptions] = useState([]);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const mostPopularCategoryRes = await AxiosInstance.get(
          "/api/category-dishes/most-popular"
        );
        const mostPopularRestaurantRes = await AxiosInstance.get(
          "/api/restaurants/most-popular"
        );

        setSectionOptions([
          {
            title: "Most Popular Dishes",
            items: mostPopularCategoryRes.data.data.items,
          },
          {
            title: "Most Popular Restaurants",
            items: mostPopularRestaurantRes.data.data.items,
          },
        ]);

        const totalCustomerRes = await AxiosInstance.get(
          "/api/customers/total"
        );
        const totalRestaurantRes = await AxiosInstance.get(
          "/api/restaurants/total"
        );
        const totalDishRes = await AxiosInstance.get("/api/dishes/total");
        const totalOrderRes = await AxiosInstance.get("/api/orders/total");
        setTotalData([
          { name: "Registerd Customers", data: totalCustomerRes.data.data },
          { name: "Restaurants Partnered", data: totalRestaurantRes.data.data },
          { name: "Food Items", data: totalDishRes.data.data },
          { name: "Orders Delivered", data: totalOrderRes.data.data },
        ]);
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <img src={banner} className="w-full" alt="banner" />
      {totalData && (
        <div className="mt-10 flex bg-primary text-white rounded-lg total-data py-8">
          {totalData.map((item, index) => (
            <div
              key={index}
              className="flex-1 px-12 text-center total-data-item"
            >
              <p className="font-light text-6xl">{item.data}+</p>
              <p className="font-bold text-xl mt-4">{item.name}</p>
            </div>
          ))}
        </div>
      )}
      {sectionOptions.map((section, index) => (
        <Section key={index} {...section} index={index} />
      ))}
    </div>
  );
}
