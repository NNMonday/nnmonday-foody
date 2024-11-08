import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../configs/axios.config";
import { LoadingIndicator } from "../../components";
import { getParamPath } from "../../utils/helpers";
import { paths } from "../../utils/magic";

const Restaurant = ({ restaurant, isGridView }) => (
  <Link
    to={getParamPath(paths.restaurantDetail.url, restaurant._id)}
    className={`flex w-full ${
      isGridView ? "flex-col" : "justify-between"
    } items-center bg-white p-6 rounded-lg border hover:shadow hover:border-primary`}
  >
    <div className={`flex ${isGridView ? "" : "items-center"} gap-4 w-full`}>
      <img
        src={restaurant.user_id.avatar || "/default-restaurant.png"}
        alt={restaurant.user_id.name || "Restaurant"}
        className="w-20 h-20 rounded-md"
      />
      <div>
        <p className="text-xl font-bold hover:text-primary">
          {restaurant.user_id?.name || "Restaurant"}
        </p>
        <p className="text-gray-500">
          Address:{" "}
          {`${restaurant.address.detail}, ${
            restaurant.address.ward_id?.name || ""
          }, ${restaurant.address.district_id?.name || ""}, ${
            restaurant.address.city_id?.name || ""
          }`}
        </p>
      </div>
    </div>
  </Link>
);

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [locations, setLocations] = useState({
    cityList: [],
    districtList: [],
    wardList: [],
  });
  const [name, setName] = useState("");
  const [selectedLocations, setSelectedLocations] = useState({
    cityId: "",
    districtId: "",
    wardId: "",
  });
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationRes = await AxiosInstance.get("/api/addresses", {
          params: selectedLocations,
        });
        setLocations(locationRes.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, [selectedLocations]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const restaurantsRes = await AxiosInstance.get("/api/restaurants", {
          params: {
            name,
            ...selectedLocations,
          },
        });
        setRestaurants(restaurantsRes.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, [name, selectedLocations]);

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

  const handleFindRestaurants = useCallback(() => {
    setIsLoading(true);
  }, []);

  return (
    <div className="flex mt-3 justify-center">
      <div className="bg-white p-6 w-64 rounded border-2 mr-4">
        <div className="space-y-4">
          <p>
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              placeholder="Restaurant name, Keyword..."
              className="border p-2 w-full rounded"
              onChange={(e) => setName(e.target.value)}
            />
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
            onClick={handleFindRestaurants}
          >
            Find Restaurants
          </button>
        </div>
      </div>

      <div className="bg-white max-w-7xl p-8 rounded border-2 flex-1">
        <div className="flex justify-end items-center space-x-4 mb-4">
          <select
            className="border p-2 rounded"
            onChange={(e) => setIsGridView(e.target.value === "grid")}
          >
            <option value="list">List View</option>
            <option value="grid">Grid View</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center w-full">
            <LoadingIndicator />
          </div>
        ) : (
          <div
            className={`grid ${isGridView ? "grid-cols-3 gap-4" : "space-y-4"}`}
          >
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <Restaurant
                  key={restaurant._id}
                  restaurant={restaurant}
                  isGridView={isGridView}
                />
              ))
            ) : (
              <p className="text-gray-500">
                No restaurants found. Click "Find Restaurants" to search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
