
'use client'
import React, { useEffect, useState } from 'react'
import { products } from '../../collection/getCollection'
import { useParams } from 'next/navigation';
import Loading from '@/component/loading';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
function page() {
    const params = useParams();
    const id = params?.id;
    const [item, setItem] = useState({});
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart } = useCart();

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
    return (
        item.name ? <div className="flex flex-col lg:flex-row p-8 gap-8 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
                <img
                    src={item.image.src} // replace with actual image path
                    alt="img error"
                    className="rounded-xl w-full object-cover h-full hover:scale-105 "
                    loading='lazy'
                />
            </div>

            <div className="w-full lg:w-1/2">
                <h1 className="text-2xl font-bold mb-2">{item.name}</h1>

                <div className="text-red-500 text-xl mb-4">★★★★☆</div>

                <div className="text-3xl font-bold mb-4">{item.price}$</div>

                <p className="text-gray-600 mb-6">
                    {item.description}    </p>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Select Size</h3>
                    <div className="flex gap-3">
                        {sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`border px-4 py-2 rounded ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Quantity</h3>
                    <div className="flex items-center">
                        <button
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            className="px-3 py-1 border rounded-l bg-gray-100"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border-t border-b">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 border rounded-r bg-gray-100"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    className={`bg-black text-white px-6 py-3 rounded hover:opacity-90 transition mb-6 ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        setIsAddingToCart(true);
                        setTimeout(() => {
                            addToCart(item, quantity, selectedSize);
                            setIsAddingToCart(false);
                        }, 500);
                    }}
                    disabled={isAddingToCart}
                >
                    {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
                </button>

                <div className="text-sm text-gray-500 space-y-1">
                    <p>100% Original product.</p>
                    <p>Cash on delivery is available on this product.</p>
                    <p>Easy return and exchange policy within 7 days.</p>
                </div>
            </div>
        </div> : <Loading />
    );
}

export default page