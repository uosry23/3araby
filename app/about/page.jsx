import React from 'react'

const page = () => {
    return (
        <div className='flex-column items-center justify-center mt-10 h-[100vh]w-full space-y-5'>
            <div className='flex justify-center  p-2 space-x-2'>
                <span className='md:text-4xl text-2xl text-gray-500 font-mono'>ABOUT
                </span >
                <span className='md:text-4xl text-2xl text=bg-black font-mono'>US</span>
            </div>
            <div className='md:flex gap-5 justify-center' >
                <div className='flex justify-center'>
                    <img className='w-[450px]' src="https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/otherImages%2F2149241325.webp?alt=media&token=12cec3da-c2ef-49b2-85ae-0a8951a1afb1" alt="" />
                </div>
                <div className='flex-column items-center justify-center space-y-10 md:w-1/2 mt-5'>
                    <p className='text-gray-600'>3Araby was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p className='text-gray-600'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.    </p>
                    <h1 className='font-bold text-gray-800'>Our Mission</h1>
                    <p className='text-gray-600'>Our mission at 3Araby is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>

            </div>
            <div className='m-4 text-xl font-bold space-x-2 mt-10 flex  justify-start '>
                <span className='text-gray-500'>WHY</span>
                <span>CHOOSE US</span>
            </div>
            <div className='flex justify-around space-x-4 w-full'>
                <div className=' flex flex-col items-start space-y-5  bg-gray-100 p-14 shadow-sm border-1 rounded-lg  hover:shadow-md transition-all duration-200 relative overflow-hidden group'>
                    <div className="absolute inset-0 bg-slate-500 w-2/5  transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>
                    <span className='font-bold' > Quality Assurance:</span>
                    <span >  We meticulously select and vet each product to ensure it meets our stringent quality standards.</span>
                </div>
                <div className=' flex flex-col items-start space-y-5  bg-gray-100 p-14 shadow-sm border-1 rounded-lg  hover:shadow-md transition-all duration-200 relative overflow-hidden group'>
                    <div className="absolute inset-0 bg-slate-500 w-2/5  transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>

                    <span className='font-bold'>Convenience:</span>
                    With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
                </div>
                <div className=' flex flex-col items-start space-y-5  bg-gray-100 p-14 shadow-sm border-1 rounded-lg  hover:shadow-md transition-all duration-200 relative overflow-hidden group'>
                    <div className="absolute inset-0 bg-slate-500 w-2/5  transform skew-x-12 scale-150 opacity-0 group-hover:opacity-70 transition duration-500 ease-in-out"></div>

                    <span className='font-bold'>  Exceptional Customer Service:</span>

                    Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
                </div>
            </div>

        </div>
    )
}
export default page