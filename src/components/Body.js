import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";
import { useEffect } from "react";

const Body = () => {

    const [listOfRestaurants, setlistofRestaurant] = useState(resList);
    
    useEffect(() => {
        fetchData();
    }, []);

   
    const fetchData = async () => {
        const data = await fetch (
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.572588&lng=77.273265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json);
        setlistofRestaurant(json.data.cards[4].card.card.facetlist);
    };



    
    return(
    <div className="body">
        <div className="filter"> 
        <button className="filter-btn" onClick={()=>{
            
            const filteredList =listOfRestaurants.filter(
                (res) => res.info.avgRating>4
            );
            setlistofRestaurant(filteredList);
        }}
        
        
        
        > Top Rated Restaurant</button>
        </div>
        <div className="res-container">
            {listOfRestaurants.map((restaurant)=> (
                 
                 <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                 ))
    
    
    
            }
        </div>
    </div>
    
    );
    };

 export default Body ;   