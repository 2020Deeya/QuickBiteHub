import { IMG_CDN_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId,
    name,
    cuisines,
    areaName,
    sla,
    costForTwo,
    avgRatingString } = resData;
  const { loggedInUser } = useContext(UserContext);
  return (
    <div data-testid="resCard"
       className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-300">
      <img className="rounded-lg" src={IMG_CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h5>{cuisines.join(", ")}</h5>
      <h5>{areaName}</h5>
      <span>
       <h4
        style={
            avgRatingString < 4
              ? { backgroundColor: "var(--light-red)" }
              : avgRatingString === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "red" }
          }
        >
          <i className="fa-solid fa-star"></i>
          {avgRatingString}
        </h4>
        <h4>•</h4>
        <h4>{sla?.lastMileTravelString ?? "2.0 km"}</h4>
        <h4>•</h4>
        <h4>{costForTwo ?? "₹200 for two"}</h4>
      </span>
      <h5>{loggedInUser}</h5>
    </div>
  )
}

// Higher Order Components
export const bestRestaurantCard = (RestaurantCard) => {
    return (props) => {
      return (
        <div>
          <label className="absolute m-2 p-2 bg-black text-white rounded-lg">TopRated</label>
          <RestaurantCard {...props}/>
        </div>
      )
    }
}

export default RestaurantCard;