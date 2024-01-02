import React from 'react'
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import Shimmer from './Shimmer';
import { useState } from "react";

const RestaurantMenu = () => {
  const {resId} = useParams();
  const resInfo = useRestaurantMenu(resId);
  
  const [showIndex, setShowIndex] = useState(0);

  if(resInfo == null) return <Shimmer />

  // TODO(): fetch required nested data ---> will be updated later through graphQL
  // Set restaurant data
  const { name, cuisines, costForTwoMessage } = resInfo?.data. cards[0]?.card?.card?.info;
  // Set menu item data
  const { itemCards } = resInfo?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card.card;
  const categories =
  resInfo?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.["card"]?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );


  console.log('resInfo', resInfo, itemCards, categories);

  return (
    <div className='text-center'>
      <h1 className='font-bold my-6 text-2xl'>{name}</h1>
      <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
      {/* categories accordions */}
      {categories.map((category,index)=>(
        // controlled comp
      <RestaurantCategory 
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => index === showIndex ? setShowIndex(null) : setShowIndex(index)}
        />)
      )}    
    </div>
  )
}

export default RestaurantMenu;
