import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = (props) => {
  const [btnName, setBtnName] = useState('Login');
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => {
    return store.cart.items;
  });
  return (
    <div className="flex justify-between shadow-md m-2 bg-pink-100 sm:bg-blue-200">
       <div className="logo-container">
          <img className="w-56" src={LOGO_URL} />
       </div>
       <div className="nav-items">
          <ul className="flex p-4 m-4 items-center">
            <li className="px-4">Online Status: {onlineStatus ? '🟢': '🔴'}</li>
            <li className="px-4"><Link to="/">Home</Link></li>
            <li className="px-4"><Link to="/about">About</Link></li>
            <li className="px-4"><Link to="/contact">Contact</Link></li>
            <li className="px-4 font-bold text-xl"><Link to="/cart">Cart - ({cartItems.length} items)</Link></li>
            <button className="px-4 hover:text-green-500 duration-[.3s]" onClick={()=>{
              btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login');
              }}>{btnName}
            </button>
            <li className="px-4 font-bold">
               <Link className="links">{loggedInUser}</Link>
            </li>
          </ul>
       </div>
    </div>
  )
}

export default Header;