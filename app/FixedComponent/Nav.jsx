'use client'

import React from 'react';
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount } = useCart();

    return (
        <div>
            <div className="w-full p-3 rounded-5">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <span className="font-bold text-lg md:text-2xl">3 A r a b y</span>
                    </Link>

                    <ul className="hidden md:flex space-x-6 text-sm md:text-base">
                        <li
                            className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full"
                        >
                            <a href='/'>home</a>
                        </li>
                        <li
                            className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full"
                        >
                            <a href='/collection'>Collection</a>
                        </li>
                        <li
                            className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full"
                        >
                            <a href='/about'>About</a>
                        </li>
                        <li
                            className="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full"
                        >
                            <a href='/contact'>contact</a>
                        </li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        <IoMdSearch className="text-lg md:text-2xl" />

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden md:inline text-sm">{user.displayName || user.email}</span>
                                <button onClick={logout} title="Logout">
                                    <FaSignOutAlt className="text-lg md:text-2xl" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <FaUser className="text-lg md:text-2xl" />
                            </Link>
                        )}

                        <Link href="/cart" className="relative">
                            <FaShoppingCart className="text-lg md:text-2xl" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            className="md:hidden text-2xl"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <ul className="flex flex-col mt-4 space-y-3 md:hidden text-lg font-medium">
                        <li
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            <a href='/'>Home</a>
                        </li>
                        <li
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            <a href='/collection'>Collection</a>
                        </li>
                        <li
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            <a href='/about'>about</a>
                        </li>
                        <li
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            <a href='/contact'>contact</a>
                        </li>
                    </ul>
                )}
            </div>

            <hr className="w-full border-t-3 mr-2" />
        </div>
    );
}

export default Nav;
