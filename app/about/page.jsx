'use client'
import React from 'react'
const Page = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-10 min-h-screen w-full space-y-10 px-4'>
            {/* Header */}
            <div className='flex justify-center p-2 space-x-2'>
                <span className='md:text-4xl text-2xl text-gray-500 font-mono'>ABOUT</span>
                <span className='md:text-4xl text-2xl text-black font-mono'>US</span>
            </div>

            {/* Image + Info Section */}
            <div className='flex flex-col md:flex-row gap-5 justify-center items-center w-full'>
                <div className='flex justify-center'>
                    <img
                        className='w-[300px] md:w-[450px] rounded-lg shadow-md'
                        src="https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/otherImages%2F2149241325.webp?alt=media&token=12cec3da-c2ef-49b2-85ae-0a8951a1afb1"
                        alt="About us"
                    />
                </div>

                <div className='flex flex-col justify-center space-y-6 md:w-1/2 mt-5 text-gray-600'>
                    <p>
                        3Araby was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                    </p>
                    <p>
                        Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                    </p>
                    <h2 className='font-bold text-gray-800 text-xl'>Our Mission</h2>
                    <p>
                        Our mission at 3Araby is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                    </p>
                </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className='w-full max-w-6xl'>
                <div className='text-xl font-bold flex space-x-2 mb-6'>
                    <span className='text-gray-500'>WHY</span>
                    <span>CHOOSE US</span>
                </div>

                <div className='flex flex-col md:flex-row justify-around gap-6'>
                    {/* Card 1 */}
                    <div className='relative overflow-hidden group bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4'>
                        <div className="absolute inset-0 bg-slate-500 w-2/5 transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>
                        <span className='font-bold relative z-10'>Quality Assurance:</span>
                        <span className='relative z-10'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</span>
                    </div>

                    {/* Card 2 */}
                    <div className='relative overflow-hidden group bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4'>
                        <div className="absolute inset-0 bg-slate-500 w-2/5 transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>
                        <span className='font-bold relative z-10'>Convenience:</span>
                        <span className='relative z-10'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</span>
                    </div>

                    <div className='relative overflow-hidden group bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4'>
                        <div className="absolute inset-0 bg-slate-500 w-2/5 transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>
                        <span className='font-bold relative z-10'>Exceptional Customer Service:</span>
                        <span className='relative z-10'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
