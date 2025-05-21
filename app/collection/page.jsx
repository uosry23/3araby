'use client'
import { input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { db } from '@/config';
import { products } from './getCollection';
import Loading from '@/component/loading';
import Link from 'next/link';
import { motion } from 'framer-motion';

const page = () => {
    const categories = ["Women", "Kids", "Men"];
    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [clothes, setclothes] = useState(products);
    const type = ["Topwear", 'Bottomwear', "Winterwear"];

    const maxProductPrice = Math.ceil(Math.max(...products.map(product => product.price)));
    const [priceRange, setPriceRange] = useState({ min: 0, max: maxProductPrice });

    const handleCheck = (category) => {
        setSelected((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handleCheckType = (category) => {
        setSelected2((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handlePriceChange = (type, value) => {
        const numValue = Number(value);
        setPriceRange(prev => {
            if (type === 'min') {
                return {
                    ...prev,
                    min: Math.min(numValue, prev.max)
                };
            } else {
                return {
                    ...prev,
                    max: Math.max(numValue, prev.min)
                };
            }
        });
    };

    const [load, setLoad] = useState(false)
    const changLoad = () => {
        setLoad(true)
    }

    useEffect(() => {
        changLoad();

        const filtered = products.filter((pro) => {
            const categoryMatch = selected.length === 0 || selected.includes(pro.category);
            const typeMatch = selected2.length === 0 || selected2.includes(pro.type);
            const priceMatch = pro.price >= priceRange.min && pro.price <= priceRange.max;
            return categoryMatch && typeMatch && priceMatch;
        });

        setclothes(filtered);
    }, [selected, selected2, priceRange]);

    return (load ? <div className='flex-column items-center gap-3'>
        <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 relative inline-block">
                <span className="relative z-10">ALL COLLECTIONS</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-black/80"></span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Browse our complete catalog and find your perfect style
            </p>
        </motion.div>
        <div className='container mx-auto px-4'>
            <div className='md:flex md:space-x-6'>
                <div className='flex-col flex items-start justify-start space-y-6 md:w-1/4'>
                    <h2 className='text-xl font-bold mb-2 border-b pb-2'>FILTERS</h2>

                    <motion.div
                        className="w-full p-5 bg-white rounded-lg shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Category</h2>
                        <div className="flex flex-col space-y-3">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    className="inline-flex items-center space-x-3 cursor-pointer group"
                                >
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(category)}
                                            onChange={() => handleCheck(category)}
                                            className="form-checkbox h-5 w-5 text-black border-2 border-gray-300 rounded transition-colors duration-200 ease-in-out focus:ring-0 focus:outline-none"
                                        />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-black transition-colors duration-200">{category}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="w-full p-5 bg-white rounded-lg shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Type</h2>
                        <div className="flex flex-col space-y-3">
                            {type.map((category) => (
                                <label
                                    key={category}
                                    className="inline-flex items-center space-x-3 cursor-pointer group"
                                >
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={selected2.includes(category)}
                                            onChange={() => handleCheckType(category)}
                                            className="form-checkbox h-5 w-5 text-black border-2 border-gray-300 rounded transition-colors duration-200 ease-in-out focus:ring-0 focus:outline-none"
                                        />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-black transition-colors duration-200">{category}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="w-full p-5 bg-white rounded-lg shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Price Range</h2>
                        <div className="text-center mb-4 font-medium">
                            <span className="text-lg">${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-600">
                                        Min Price
                                    </label>
                                    <span className="text-sm font-medium">${priceRange.min}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxProductPrice}
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-600">
                                        Max Price
                                    </label>
                                    <span className="text-sm font-medium">${priceRange.max}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxProductPrice}
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:ml-2 md:w-full mt-4">
                    {clothes.map((item) => (
                        <Link
                            href={`/details/${item.id}`}
                            key={item.id}
                        // onClick={(e) => {
                        //     // Optional: Show loading state immediately
                        //     // setLoadingItemId(item.id);
                        // }}
                        >
                            <motion.div
                                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image.src}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        alt={item.name}
                                    />
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="w-full bg-white text-black py-2 rounded-md font-medium text-sm">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-500 text-xs mb-1">{item.category}</p>
                                    <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                                    <p className="font-bold text-black mt-1">${item.price.toFixed(2)}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div> : <Loading />);
};

export default page;
