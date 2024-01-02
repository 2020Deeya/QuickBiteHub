import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = (props) => {
    const dispatch = useDispatch();
    function handleClearCart () {
        dispatch(clearCart());
    };
    const cartItems = useSelector((store)=> store.cart.items);
    return (
      <div className="text-center m-4 p-4">
        <h1 className="text-xl font-bold">Cart</h1>
        <div className="w-6/12 mx-auto border border-solid border-black">
           <button className="m-2 p-2 bg-slate-600 text-white rounded-md" onClick={handleClearCart}>Clear Cart</button>
           {cartItems.length == 0 && <h2>Your cart is empty. Add Items to the cart!</h2>}
           <ItemList items={cartItems} />
        </div>
      </div>
    )
};

export default Cart;