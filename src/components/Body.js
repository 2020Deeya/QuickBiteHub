import { useState, useEffect, useContext } from "react";
import {SWIGGY_API_URL} from '../utils/constants';
import Shimmer from "./Shimmer";
import RestaurantCard, {bestRestaurantCard} from "./RestaurantCard";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from "../utils/UserContext";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);

  const BestRestaurantCard = bestRestaurantCard(RestaurantCard);

  useEffect(()=>{
    getRestaurants();
  },[]);

  async function getRestaurants() {
    try {
      const res = await fetch(SWIGGY_API_URL);
      const jsonResponse = await res.json();

      // fetch required nested data ---> will be updated later through graphQL
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
            // initialize checkData for Swiggy Restaurant data
            let checkData =
              jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants;
            // if checkData is not undefined then return it
            if (checkData !== undefined) {
              return checkData;
            }
          }
      }

      const resData = await checkJsonData(jsonResponse);
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch(error) {
      console.log('error',error);
    }
  }

  if(allRestaurants?.length === 0) return <Shimmer />
  
  if(!onlineStatus){
    return <p>You're offline. Please check network connection!</p>
  }

  return (
    <div className="body">
      <div className="flex items-center">
      <div className="m-4 p-4">
        <input type="text" data-testid="searchInput" className="border border-solid border-black" value={searchText} onChange={(event)=>{
          setSearchText(event.target.value);
        }}></input>
        <button className="px-4 py-2 bg-green-400 rounded-lg"  onClick={()=>{
         const filteredList = allRestaurants.filter((res)=>{
          return res.info.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredRestaurants(filteredList);
        }}>Search</button>
      </div>
      <div className="m-4 p-4">
       <button className="px-4 py-2 bg-blue-300 rounded-lg" onClick={()=>{
          const filteredList = allRestaurants.filter((res)=>{
            return res.info.avgRating > 4;
          });
          setFilteredRestaurants(filteredList);
       }}>Top rated Restro</button>
      </div>
      <div>
        <input type="text" value={loggedInUser} className="border border-solid border-black" onChange={(event)=>{
            setUserName(event.target.value);
        }}></input>
      </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant)=> {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              {/** if restro is open then add open label to it */}
              {restaurant?.info?.avgRating > 4.2 ? <BestRestaurantCard resData={restaurant?.info} />: <RestaurantCard resData={restaurant?.info} />}
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default Body;