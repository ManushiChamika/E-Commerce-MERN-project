import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../assets/login-3_.jpg'

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
    };

    return (
        <div
            className="h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url(${login})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <section
                className="relative z-10 max-w-sm border shadow bg-white bg-opacity-80 mx-auto p-8 rounded-md"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.72)', // This makes the background translucent
                }}
            >
                <h2 className="text-2xl font-semibold pt-5 text-center text-gray-800 italic underline">Please Login</h2>
                <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email address"
                        required
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        required
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />

                    {message && <p className="text-red-500">{message}</p>}

                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary-dark text-white hover:bg-red-900 font-medium py-3 rounded-md"
                    >
                        Login
                    </button>
                </form>

                <div>
                    <p className="my-5 italic text-sm text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-red-700 px-1 underline">
                            Register
                        </Link>{' '}
                        here.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Login;
