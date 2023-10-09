import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setlistofRestaurant] = useState([]);
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.572588&lng=77.273265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      setlistofRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  //   Function for searching restaurant

  const searchRestaurant = () => {
    const filteredRestaurants = listOfRestaurants?.filter((res) =>
      res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setlistofRestaurant(filteredRestaurants);
    console.log(searchText);
  };

  //   Function for top rated restaurant

  const topRatedRestaurant = () => {
    const filteredList = listOfRestaurants?.filter((res) => res.info.avgRating > 4);
    setlistofRestaurant(filteredList);
  };

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              searchRestaurant();
            }}
            className="filter-btn">
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            topRatedRestaurant();
          }}>
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {listOfRestaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
