'use client'
import { input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import img1 from '../../assets/img1.jpg'
import Image from 'next/image';
import { db } from '@/config';
import { products } from './getCollection';
import Loading from '@/component/loading';
import Link from 'next/link';
const page = () => {
    const categories = ["Women", "Kids", "Men"];
    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [clothes, setclothes] = useState(products);
    const type = ["Topwear", 'Bottomwear', "Winterwear"];

    // Calculate the maximum price from products for the price range slider
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
                // Ensure min doesn't exceed max
                return {
                    ...prev,
                    min: Math.min(numValue, prev.max)
                };
            } else {
                // Ensure max isn't less than min
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
        <div className='flex justify-center mt=2 p-2 space-x-2'>
            <span className='md:text-4xl text-2xl text-gray-500 font-mono'>ALL</span >
            <span className='md:text-4xl text-2xl text=bg-black font-mono'>COLLECTIONS</span>
        </div>
        <div className='flex justify-start mt=2 p-2 md:text-xl space-x-2 font-bold'>FILTERS</div>
        <div className='md:flex md:space-x-6'>
            <div className='flex-col flex items-start justify-start space-y-6 md:w-1/4'>

                <div className="w-full p-4 bg-white rounded-3 shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Category</h2>
                    <div className="flex flex-col space-y-2">
                        {categories.map((category) => (
                            <label
                                key={category}
                                className="inline-flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(category)}
                                    onChange={() => handleCheck(category)}
                                    className="form-checkbox h-5 w-5 text-fuchsia-950"
                                />
                                <span className="text-gray-800">{category}</span>
                            </label>
                        ))}
                    </div>


                </div>
                <div className='w-full p-4 bg-white rounded-3 shadow-md'>
                    <h2 className='text-lg font-semibold mb-3' >Type</h2>
                    <div className='flex flex-col space-y-2'>
                        {type.map((category) => (
                            <span
                                key={category}
                                className="inline-flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected2.includes(category)}
                                    onChange={() => handleCheckType(category)}
                                    className="form-checkbox h-5 w-5 text-fuchsia-950"
                                />
                                <span className="text-gray-800">{category}</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className='w-full p-4 bg-white rounded-3 shadow-md'>
                    <h2 className='text-lg font-semibold mb-3'>Price Range</h2>
                    <div className='text-center mb-3 text-sm font-medium text-gray-700'>
                        ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Price: ${priceRange.min}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={maxProductPrice}
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Price: ${priceRange.max}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={maxProductPrice}
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex-wrap flex justify-between  md:ml-2 md:w-full mt-4">
                {clothes.map((item) => (

                    <Link href={`/details/${item.id}`} className='flex flex-col items-center  w-1/2 md:w-1/4 p-4 ' key={item.id}>

                        <div
                            className='  '
                            key={item.id}
                        >
                            <img
                                src={item.image.src}
                                className="w-full h-64 object-cover hover:cursor-pointer hover:scale-105 duration-200"
                                loading='lazy'
                                width={300}
                                height={300}
                                alt={item.name}
                            />
                            <div className="text-center w-full">
                                <p className='text-gray-700 font-medium'>{item.name}</p>
                                <p className='text-gray-500 text-sm'>{item.description}</p>
                                <p className='font-bold text-lg mt-1'>${item.price.toFixed(2)}</p>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>


        </div>


    </div> : <Loading />)
}

export default page