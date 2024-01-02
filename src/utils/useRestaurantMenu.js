import { useEffect, useState } from 'react';
import {swiggy_menu_api_URL} from './constants';

const useRestaurantMenu = (menuId) => {
    // fetching data from api
    const [resInfo, setResInfo] = useState(null);

    useEffect(()=> {
       getMenuDetails();
    },[])

    async function getMenuDetails() {
     const res = await fetch(swiggy_menu_api_URL + menuId);
     const data = await res.json();
     setResInfo(data);
    }
  
    return resInfo;
}

export default useRestaurantMenu;
