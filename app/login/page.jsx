'use client'

import React, { useEffect, useState } from 'react'

function page() {
    const [login, setlogin] = useState(false)
    useEffect(() => {

        console.log(login);

    }, [login])
    const handelLogin = () => {
        setlogin(!login)
    }
    return (
        login ? <div className='flex-col items-center flex '>
            <div className='mt-20 flex-col items-center gap-4 flex '>
                <div className='text-2xl md:text-4xl font-bold font-mono mb-5 '>Login</div>
                <div className='flex-col gap-3 flex w-full'>
                    <div> <input type="Email" placeholder='Email' className='w-full border-2 border-black h-10 p-2' /></div>
                    <div> <input type="password" placeholder='password' className='w-full border-2 border-black h-10 p-2' /></div>
                </div>

                <div className='flex gap-20'>
                    <span> Forgot your password?</span>
                    <button className='hover:cursor-pointer' onClick={() => handelLogin()}>Create account</button>
                </div>
                <div className='flex justify-center w-full'>
                    <button className=" hover:cursor-pointer w-full bg-gray-700 text-white py-2 px-4  hover:bg-gray-950 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ">login</button>
                </div>
            </div>
        </div> : <div className="mt-20 flex-col items-center gap-4 flex ">
            <div className=" p-3 w-full max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold font-mono mb-5 text-center">Sign Up</h2>

                <form className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <input type="Email" placeholder='Name' className='w-full border-2 border-black h-10 p-2' />
                    </div>

                    {/* Email */}
                    <div>
                        <input type="Email" placeholder='Email' className='w-full border-2 border-black h-10 p-2' />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <input type="number" placeholder='phone number' className='w-full border-2 border-black h-10 p-2' />
                    </div>
                    <div className='flex justify-end w-full'><button className='hover:cursor-pointer' onClick={() => handelLogin()}>Already have Account ?</button></div>

                    {/* Submit Button */}
                    <button className=" hover:cursor-pointer w-full bg-gray-700 text-white py-2 px-4  hover:bg-gray-950 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ">Sign Up</button>

                </form>
            </div>
        </div>
    )
}

export default page