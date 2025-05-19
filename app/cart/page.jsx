'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import Image from 'next/image';
import Loading from '@/component/loading';
import { motion } from 'framer-motion';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isLoading } = useCart();

    if (isLoading) {
        return <Loading />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16">
                <motion.div
                    className="text-center py-16 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FaShoppingBag className="text-gray-400 text-3xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet. Explore our collections and find something you'll love.</p>
                    <Link href="/collection">
                        <motion.button
                            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-md hover:bg-black/80 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaArrowLeft className="mr-2" /> Continue Shopping
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-6xl mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <span className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <motion.div
                    className="lg:w-2/3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Your Items</h2>
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
                            >
                                Clear All
                            </button>
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <motion.li
                                    key={`${item.id}-${item.size}`}
                                    className="flex flex-col sm:flex-row items-center p-5 hover:bg-gray-50 transition-colors duration-200"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="sm:w-24 h-24 mr-5 mb-4 sm:mb-0 flex-shrink-0 rounded-md overflow-hidden">
                                        {item.image && (
                                            <img
                                                src={item.image.src}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>
                                            {item.category && (
                                                <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                                            )}
                                        </div>
                                        <p className="font-bold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors duration-200"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors duration-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="p-5 border-t border-gray-100 flex justify-between items-center">
                            <Link href="/collection" className="text-gray-600 hover:text-black transition-colors duration-200 flex items-center text-sm font-medium">
                                <FaArrowLeft className="mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    className="lg:w-1/3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-5">
                        <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (10%)</span>
                                <span>${(cartTotal * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-black/90 transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Proceed to Checkout
                        </motion.button>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Secure checkout powered by Stripe</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default CartPage;