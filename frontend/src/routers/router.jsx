import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "/",
          element:<Home/>
        },
        {
          path: "/categories/:categoryName", 
          element : <Category/>        
        },
        {
          path: "/search", 
          element : <Search/>      
        },
        {
          path: "/shop", 
          element : <ShopPage/>      
        },
        {
          path: "/shop/:id", 
          element : <SingleProduct/>      
        },
        {
          path: "/success",
          element : <PaymentSuccess/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    //dashboard routes
    {
      path: "/dashboard",
      element: <div><DashboardLayout/></div>, // TODO use private route
      children: [
        //user routes
        {path : '', element : <div>User Dashboard</div>},
        {path : 'orders', element : <div>User Orders</div>},
        {path : 'payments', element : <div>User Payments</div>},
        {path : 'profile', element : <div>User Profile</div>},
        {path : 'reviews', element : <div>User Reviews</div>},

        //admin routes (only accessible to admin) //TODO: use private route
        {path : 'admin', element : <div>Admin Dashboard</div>},
        {path : 'add-new-post', element : <div>Add New Post</div>},
        {path : 'manage-products', element : <div>Manage Post</div>},
        {path : 'update-product/:id', element : <div>Update Post</div>},        
        {path : 'users', element : <div>All Users</div>},
        {path : 'manage-orders', element : <div>Manage Order</div>},

      ]
    } 
  ]);

  export default router;