
'use client'
import React, { useEffect, useState } from 'react'
import { products } from '../../collection/getCollection'
import { redirect, useParams } from 'next/navigation';
import Loading from '@/component/loading';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import { motion } from 'framer-motion';
function page() {
    const params = useParams();
    const id = params?.id;
    const [item, setItem] = useState({});
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart } = useCart();
    const chekUser = getAuth()

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const getItem = () => {
        const resultItem = products.filter((item) => {
            return item.id == id
        })
        setItem(resultItem[0])
    }
    useEffect(() => {
        getItem()
        console.log(item && item.image);

        // console.log(item);
        // console.log(id);

    }, [item])
    const handelAddTocart = () => {
        console.log(chekUser.currentUser);
        if (chekUser.currentUser) {

            setIsAddingToCart(true);
            setTimeout(() => {
                addToCart(item, quantity, selectedSize);
                setIsAddingToCart(false);
            }, 500);
        }
        else
            redirect('/login')
    }
    return (
        item.name ? (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Product Image */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 h-[500px]">
                            <img
                                src={item.image.src}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-black text-white text-xs px-2 py-1 rounded">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-2 text-sm text-gray-500 uppercase tracking-wider">
                                {item.type || 'Fashion'}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.name}</h1>

                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400 mr-2">
                                    {'★★★★☆'}
                                </div>
                                <span className="text-gray-500 text-sm">(4.0) · 120 Reviews</span>
                            </div>

                            <div className="text-3xl font-bold mb-6">${item.price}</div>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3 text-gray-900">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${selectedSize === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3 text-gray-900">Quantity</h3>
                                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="w-10 h-10 flex items-center justify-center text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center font-medium">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button
                                    className={`w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-black/90 transition-all duration-200 ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    onClick={handelAddTocart}
                                    disabled={isAddingToCart}
                                >
                                    {isAddingToCart ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            ADDING TO CART
                                        </span>
                                    ) : 'ADD TO CART'}
                                </button>

                                <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
                                    <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-600">100% Original</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className="text-gray-600">Cash on Delivery</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                        </svg>
                                        <span className="text-gray-600">7-Day Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        ) : <Loading />
    );
}

export default page