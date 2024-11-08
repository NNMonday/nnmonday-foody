import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AxiosInstance from "../../configs/axios.config";
import { AddToCart, Column, Grid } from "../../assets/SvgIcons";
import { Pagination, LoadingIndicator } from "../../components";
import { getParamPath } from "../../utils/helpers";
import { paths } from "../../utils/magic";
import { useCart } from "../../contexts/cart.context";

const CustomToggle = ({ isOn, setIsOn }) => (
  <div
    className={`w-16 h-8 flex items-center rounded-full pl-2 cursor-pointer transition-colors duration-300 ${
      isOn ? "bg-primary" : "bg-gray-300"
    }`}
    onClick={() => setIsOn(!isOn)}
  >
    <div
      className={`transform transition-transform duration-300 ${
        isOn ? "translate-x-6" : "translate-x-0"
      }`}
    >
      {isOn ? <Grid /> : <Column />}
    </div>
  </div>
);

const Dish = ({ dish, isGridView }) => {
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();

  return (
    <Link
      to={getParamPath(paths.dishDetail.url, dish._id)}
      className={`flex w-full ${
        isGridView ? "flex-col" : "justify-between"
      } items-center bg-white p-6 rounded-lg border hover:shadow hover:border-primary`}
    >
      <div className={`flex ${isGridView ? "" : "items-center"} gap-4 w-full`}>
        <img
          src={dish.image}
          alt={dish.name}
          className="w-20 h-20 rounded-md"
        />
        <div>
          <p className="text-xl font-bold hover:text-primary">{dish.name}</p>
          <p className="text-gray-700 font-semibold">
            ${dish.price.toFixed(2)}
          </p>
          <p className="text-gray-500">Sold: {dish.soldCount}</p>
        </div>
      </div>
      {!isGridView && (
        <div className="flex gap-x-5 justify-end">
          <div className="text-end">
            <button
              onClick={() =>
                navigate(
                  getParamPath(paths.restaurantDetail.url, dish.restaurant._id)
                )
              }
              to={getParamPath(paths.restaurantDetail.url, dish.restaurant._id)}
              className="text-lg font-medium hover:text-primary"
            >
              Restaurant: {dish.restaurant.name}
            </button>
            <p className="text-gray-500">Address: {dish.restaurant.address}</p>
          </div>

          <button
            className="bg-blue-100 text-blue-500 px-4 py-2 rounded font-medium hover:bg-primary hover:text-white w-auto"
            onClick={async (e) => {
              try {
                e.stopPropagation();
                e.preventDefault();
                const newCart = [...cart];
                const index = newCart.findIndex(
                  (item) => item.dish_id._id === dish._id
                );

                if (index !== -1) {
                  newCart[index].quantity += 1;
                  await updateCart(newCart);
                } else {
                  newCart.push({ dish_id: dish, quantity: 1 });
                  await updateCart(newCart);
                }
              } catch (error) {}
            }}
          >
            <AddToCart />
          </button>
        </div>
      )}
    </Link>
  );
};

const Menu = () => {
  const [searchParams] = useSearchParams();
  const categoryDishId = searchParams.get("categoryDishId");
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState({
    cityList: [],
    districtList: [],
    wardList: [],
  });
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryDishId || ""
  );
  const [selectedLocations, setSelectedLocations] = useState({
    cityId: "",
    districtId: "",
    wardId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const locationRes = await AxiosInstance.get("/api/addresses", {
        params: selectedLocations,
      });
      setLocations(locationRes.data.data);
    })();
  }, [selectedLocations]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const categoryRes = await AxiosInstance.get("/api/category-dishes");
        setCategories(categoryRes.data.data);

        const locationRes = await AxiosInstance.get("/api/addresses");
        setLocations(locationRes.data.data);

        const dishesRes = await AxiosInstance.get("/api/dishes", {
          params: {
            categoryId: categoryDishId,
          },
        });
        const {
          items,
          totalPageCount,
          currentPage: responsePage,
        } = dishesRes.data.data;

        setDishes(items);
        setTotalPages(totalPageCount);
        setCurrentPage(responsePage);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleLocationsChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "cityId") {
      setSelectedLocations({
        cityId: value,
        districtId: "",
        wardId: "",
      });
    } else if (name === "districtId") {
      setSelectedLocations((prev) => ({
        ...prev,
        districtId: value,
        wardId: "",
      }));
    } else {
      setSelectedLocations((prev) => ({
        ...prev,
        wardId: value,
      }));
    }
  }, []);

  const onPageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
    setIsLoading(true);
  }, []);

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
    setIsLoading(true);
  }, []);

  const handleFindDishes = useCallback(() => {
    setCurrentPage(1);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        try {
          const response = await AxiosInstance.get("/api/dishes", {
            params: {
              name,
              categoryId: selectedCategory,
              ...selectedLocations,
              pageNumber: currentPage,
              pageSize,
            },
          });

          const {
            items,
            totalPageCount,
            currentPage: responsePage,
          } = response.data.data;
          setDishes(items);
          setTotalPages(totalPageCount);
          setCurrentPage(responsePage);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [
    name,
    selectedCategory,
    selectedLocations,
    currentPage,
    pageSize,
    isLoading,
  ]);

  return (
    <div className="flex mt-3 justify-center">
      <div className="bg-white p-6 w-64 rounded border-2 mr-4">
        <div className="space-y-4">
          <p>
            <label htmlFor="name">Dish Name</label>
            <input
              type="text"
              placeholder="Dish name, Keyword..."
              className="border p-2 w-full rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="category">Category</label>
            <select
              className="border p-2 w-full rounded"
              name="category"
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="cityId">City</label>
            <select
              className="border p-2 w-full rounded"
              name="cityId"
              id="cityId"
              onChange={handleLocationsChange}
              value={selectedLocations.cityId}
            >
              <option value="">All Cities</option>
              {locations.cityList.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="districtId">District</label>
            <select
              className="border p-2 w-full rounded"
              name="districtId"
              id="districtId"
              onChange={handleLocationsChange}
              value={selectedLocations.districtId}
            >
              <option value="">
                {selectedLocations.cityId ? "All Districts" : "Select a City"}
              </option>
              {locations.districtList?.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="wardId">Ward</label>
            <select
              className="border p-2 w-full rounded"
              name="wardId"
              id="wardId"
              onChange={handleLocationsChange}
              value={selectedLocations.wardId}
            >
              <option value="">
                {selectedLocations.districtId
                  ? "All Wards"
                  : "Select a District"}
              </option>
              {locations.wardList?.map((ward) => (
                <option key={ward._id} value={ward._id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </p>
          <button
            className="bg-blue-500 text-white w-full py-2 rounded"
            onClick={handleFindDishes}
          >
            Find Dishes
          </button>
        </div>
      </div>

      <div className="bg-white max-w-7xl p-8 rounded border-2 flex-1">
        <div className="flex justify-end items-center space-x-4 mb-4">
          <select
            className="border p-2 rounded"
            onChange={onPageSizeChange}
            value={pageSize}
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
          <CustomToggle isOn={isGridView} setIsOn={setIsGridView} />
        </div>

        {isLoading ? (
          <div className="flex items-center w-full">
            <LoadingIndicator />
          </div>
        ) : (
          <div
            className={`grid ${isGridView ? "grid-cols-3 gap-4" : "space-y-4"}`}
          >
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <Dish key={dish._id} dish={dish} isGridView={isGridView} />
              ))
            ) : (
              <p className="text-gray-500">
                No dishes found. Click "Find Dishes" to search.
              </p>
            )}
          </div>
        )}
        {dishes.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
