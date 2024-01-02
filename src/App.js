import React, { lazy, Suspense, useState, useEffect  } from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Body from './components/Body';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from "./utils/UserContext";
import { Provider } from  "react-redux";
import appStore from './utils/appStore';
import Cart from './components/Cart';

const About = lazy(()=> import('./components/About'));
const Contact = lazy(()=> import('./components/Contact'));

const AppLayout = () => {
    const [userName, setUserName] = useState();
    // authentication
    useEffect(()=>{
       // Make an API call and send username and password
       const data = {
        name: 'Deeya',
      };
      setUserName(data.name);
    }, []);
    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:userName, setUserName}}>
            <div className="app">
               <Header />
               <Outlet />
            </div>
        </UserContext.Provider>
        </Provider>
     )
}

const approuter = createBrowserRouter ([
    {
        path:'/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path:'/',
                element: <Body />
            },
            {
                path:'/about',
                element: (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path:'/contact',
                element: (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Contact />
                    </Suspense>
                ),
            },
            {
                path:'/cart',
                element: (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path:'restaurant/:resId',
                element: <RestaurantMenu />
            }
        ]
    },
]);

// to create root and render the SPA
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={approuter}/>);


