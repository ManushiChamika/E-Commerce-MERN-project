import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartModel from '../pages/shop/CartModel';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
    //using redux to get the products in the cart
    const products = useSelector((state) => state.cart.products);
    // console.log(products);
    //by default false
    const [isCartOpen, setIsCartOpen] =useState(false);
    //close and open cart
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    }

    //TODO:
    //show user if logged in
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    // console.log(user);
    //logout user
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    //TODO: 
    //dropdown for user
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    //TODO:
    //admin dropdown menus
    const adminDropDownMenus = [
        {label : "Dashboard" , path: "/dashboard/admin"},
        {label : "Manage Items" , path: "/dashboard/manage-products"},
        {label : "All Orders" , path: "/dashboard/manage-orders"},
        {label : "Add Product" , path: "/dashboard/add-new-product"},
    ]

    //TODO:
    //user dropdown menus
    const userDropDownMenus = [
        {label : "DashBoard" , path: "/dashboard/"},
        {label : "Profile" , path: "/dashboard/profile"},
        {label : "Payments" , path: "/dashboard/payments"},
        {label : "Orders" , path: "/dashboard/orders"},
    ]

    const  dropDrownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

    //we put async because we are making a request to the server
    //sync is used to update the UI and not used to make requests
    //logout user
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
            alert('User logged out successfully');
        } catch (error) {
            console.log('Error logging out', error);
            alert('Error logging out!');
        }
    }
    //--------------------------------------------------
    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/">Pages</Link></li>
                    <li className='link'><Link to="/contact">Contact</Link></li>
                </ul>

                {/* logo */}
                <div className='nav__logo'>
                    <Link to="/">EzyShopper<span>.</span></Link>
                </div>

                {/* nav icons */}
                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button 
                            onClick={handleCartToggle}
                            className='hover:text-primary'>
                            <i className="ri-shopping-bag-line"></i>
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary'>
                                {products.length}
                            </sup>
                        </button>
                    </span>
                    <span>
                        {/* TODO: */}
                        {
                            user && user ? (<>                           
                                <img 
                                    onClick={handleDropDownToggle}
                                    src={user?.profileImage || avatarImg} alt="" className='size-6 rounded-full cursor-pointer'
                                />
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                            <ul className='font-medium space-y-4 p-2'>
                                                {dropDrownMenus.map((menu, index) => (
                                                    <li key={index}>
                                                        <Link 
                                                            onClick = {() => setIsDropDownOpen(false)}
                                                            className = 'dropdown-items' to={menu.path}>{menu.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </>):
                            (<Link to = "login">
                                <i className="ri-user-line"></i>
                            </Link>) 
                        }
                    </span>
                </div>
            </nav>
            {
                isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
            }
            
        </header>
    )
}

export default Navbar