import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import Search from "../pages/search/Search";

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
      ],
    }, 
  ]);

  export default router;