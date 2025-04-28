'use client'
import { input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import img1 from '../../assets/img1.jpg'
import Image from 'next/image';
import { db } from '@/config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Loading from '@/component/loading';
const page = () => {
    const categories = ["Women", "Kids", "Men"];
    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [clothes, setClothes] = useState([])
    const products = [
        {
            id: 1,
            name: "Girls Round Neck Cotton Top",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
            price: 19.99,
            category: "Girls' Clothing",
            description: "Soft round neck cotton top for girls"
        },
        {
            id: 2,
            name: "Men Round Neck Pure Cotton T-shirt",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            price: 24.99,
            category: "Men's Clothing",
            description: "Breathable pure cotton T-shirt for men"
        },
        {
            id: 3,
            name: "Boy Round Neck Pure Cotton T-shirt",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
            price: 17.99,
            category: "Boys' Clothing",
            description: "Durable cotton T-shirt for boys"
        },
        {
            id: 4,
            name: "Women Zip-Front Relaxed Fit Jacket",
            image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
            price: 49.99,
            category: "Women's Clothing",
            description: "Casual zip-front jacket with relaxed fit"
        },
        {
            id: 5,
            name: "Women Cotton Floral Dress",
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
            price: 34.99,
            category: "Women's Clothing",
            description: "Lightweight floral dress perfect for summer"
        },
        {
            id: 6,
            name: "Men Slim Fit Jeans",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
            price: 39.99,
            category: "Men's Clothing",
            description: "Classic slim fit jeans for men"
        },
        {
            id: 7,
            name: "Girls Denim Jacket",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
            price: 29.99,
            category: "Girls' Clothing",
            description: "Stylish denim jacket for girls"
        },
        {
            id: 8,
            name: "Men Casual Sneakers",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            price: 59.99,
            category: "Men's Footwear",
            description: "Comfortable casual sneakers"
        },
        {
            id: 9,
            name: "Women High Waist Leggings",
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
            price: 22.99,
            category: "Women's Clothing",
            description: "Stretchy high waist leggings"
        },
        {
            id: 10,
            name: "Men Cotton Polo Shirt",
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
            price: 27.99,
            category: "Men's Clothing",
            description: "Classic cotton polo shirt"
        },
        {
            id: 11,
            name: "Boy Cargo Shorts",
            image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2",
            price: 18.99,
            category: "Boys' Clothing",
            description: "Durable cargo shorts for boys"
        },
        {
            id: 12,
            name: "Women Sports Bra",
            image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8",
            price: 16.99,
            category: "Women's Activewear",
            description: "Supportive sports bra"
        },
        {
            id: 13,
            name: "Men Leather Belt",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
            price: 14.99,
            category: "Men's Accessories",
            description: "Genuine leather belt"
        },
        {
            id: 14,
            name: "Girls Cotton Skirt",
            image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2",
            price: 15.99,
            category: "Girls' Clothing",
            description: "Comfortable cotton skirt"
        },
        {
            id: 15,
            name: "Women Wool Coat",
            image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4",
            price: 89.99,
            category: "Women's Outerwear",
            description: "Warm wool winter coat"
        },
        {
            id: 16,
            name: "Men Running Shoes",
            image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
            price: 69.99,
            category: "Men's Footwear",
            description: "Lightweight running shoes"
        },
        {
            id: 17,
            name: "Boy Hooded Sweatshirt",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
            price: 21.99,
            category: "Boys' Clothing",
            description: "Warm hooded sweatshirt"
        },
        {
            id: 18,
            name: "Women Silk Scarf",
            image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2",
            price: 12.99,
            category: "Women's Accessories",
            description: "Elegant silk scarf"
        },
        {
            id: 19,
            name: "Men Cotton Underwear",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
            price: 8.99,
            category: "Men's Underwear",
            description: "Breathable cotton underwear"
        },
        {
            id: 20,
            name: "Girls Cotton Socks",
            image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2",
            price: 5.99,
            category: "Girls' Accessories",
            description: "Soft cotton socks"
        },
        {
            id: 21,
            name: "Women Leather Handbag",
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
            price: 45.99,
            category: "Women's Accessories",
            description: "Genuine leather handbag"
        },
        {
            id: 22,
            name: "Men Winter Gloves",
            image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2",
            price: 11.99,
            category: "Men's Accessories",
            description: "Warm winter gloves"
        },
        {
            id: 23,
            name: "Boy Cotton Pajamas",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
            price: 16.99,
            category: "Boys' Clothing",
            description: "Comfortable cotton pajamas"
        },
        {
            id: 24,
            name: "Women Cotton Blouse",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
            price: 29.99,
            category: "Women's Clothing",
            description: "Elegant cotton blouse"
        },
        {
            id: 25,
            name: "Men Formal Dress Shirt",
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
            price: 34.99,
            category: "Men's Clothing",
            description: "Classic formal dress shirt"
        }
    ];


    const type = ["Topwear", 'Bottomwear', "Winterwear"]

    const handleCheck = (category) => {
        setSelected((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
        // console.log(selected);

    };
    const handleCheckType = (category) => {
        setSelected2((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
        // console.log(selected2);

    };
    // async function uploadClothes() {
    //     const clothesCollection = collection(db, "clothes");

    //     try {
    //         for (const item of products) {
    //             await addDoc(clothesCollection, item);
    //         }
    //         console.log("Clothes uploaded successfully!");
    //     } catch (error) {
    //         console.error("Error uploading clothes:", error);
    //     }
    // }

    async function getClothes() {
        try {
            const clothesdata = await getDocs(collection(db, 'clothes'))
            const data = clothesdata.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setClothes(data)
        }
        catch (Error) {
            console.log(Error);
        }
    }
    useEffect(() => {
        // uploadClothes()
        getClothes()

    }, [])
    return (clothes.length > 0 ? <div className='flex-column items-center gap-3'>
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

            </div>
            <div className="flex-wrap flex justify-between  md:ml-2 md:w-full mt-4">
                {products.map((item) => (
                    <div
                        className='flex flex-col items-center  w-1/2 md:w-1/4 p-4   '
                        key={item.id}
                    >
                        <img
                            src={item.image}
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
                ))}




            </div>


        </div>


    </div> : <Loading />)
}

export default page