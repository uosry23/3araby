'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import Loading from '@/component/loading';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isLoading } = useCart();

    if (isLoading) {
        return <Loading />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                    <Link href="/collection" className="inline-flex items-center bg-black text-white px-6 py-3 rounded hover:opacity-90">
                        <FaArrowLeft className="mr-2" /> Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                        </div>

                        <ul>
                            {cartItems.map((item) => (
                                <li key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row items-center p-4 border-b">
                                    <div className="sm:w-24 h-24 mr-4 mb-4 sm:mb-0 flex-shrink-0">
                                        {item.image && (
                                            <img
                                                src={item.image.src}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">Size: {item.size}</p>
                                        <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <div className="flex items-center border rounded mr-4">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="px-3 py-1 bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="px-3 py-1 bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-red-500"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="p-4 flex justify-between">
                            <button
                                onClick={clearCart}
                                className="text-red-500 flex items-center"
                            >
                                <FaTrash className="mr-2" /> Clear Cart
                            </button>
                            <Link href="/collection" className="text-blue-600 flex items-center">
                                <FaArrowLeft className="mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${(cartTotal * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded hover:opacity-90 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;