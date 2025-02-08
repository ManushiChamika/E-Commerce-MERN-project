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
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/userReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";


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
        },
        {
          //order details
          path: "/orders/:orderId",
          element : <OrderDetails/>
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
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>, // TODO use private route
      children: [
        //user routes
        {path : '', element : <UserDMain/>},
        {path : 'orders', element : <UserOrders/>},
        {path : 'payments', element : <UserPayments/>},
        {path : 'profile', element : <UserProfile/>},
        {path : 'reviews', element : <UserReviews/>},

        //admin routes (only accessible to admin) //TODO: use private route
        {
          path : 'admin', 
          element : <PrivateRoute role="admin"><AdminDMain/></PrivateRoute> 
        },
        {
          path : 'add-new-product', 
          element : <PrivateRoute role="admin"><AddProduct/></PrivateRoute> 
        },
        {
          path : 'manage-products',
          element : <PrivateRoute role="admin"> <div>Manage Post</div></PrivateRoute>
        },
        {
          path : 'update-product/:id',
          element : <PrivateRoute role="admin"> <div>Update Post</div></PrivateRoute>
        },        
        {
          path : 'users', 
          element : <PrivateRoute role="admin"><div>All Users</div></PrivateRoute>
        },
        {
          path : 'manage-orders',
          element : <PrivateRoute role="admin"><div>Manage Order</div></PrivateRoute>
        },

      ]
    } 
  ]);

  export default router;