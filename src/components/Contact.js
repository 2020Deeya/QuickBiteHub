import React from 'react'
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Contact = () => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className='text-center'>
      <h1 className='font-bold text-3xl p-4 m-4'>Hey {loggedInUser}, Contact us!</h1>
      <form>
        <input type='text' className='border border-black m-2 p-2' placeholder='name' />
        <input type='text' className='border border-black m-2 p-2' placeholder='place'/>
        <input type='text' className='border border-black m-2 p-2' placeholder='age'/>
        <button type='submit' className='bg-green-600 text-white m-2 p-2 rounded-lg'>Submit</button>
      </form>
    </div>
  )
}

export default Contact;
