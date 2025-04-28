import React from 'react'

const page = () => {
    return (
        <div className='mt-10 flex flex-col items-center space-y-3 mb-10'>
            <div className='flex justify-center mt=2 p-2 space-x-2'>
                <span className='md:text-4xl text-2xl  text-gray-500 font-mono'>CONTACT
                </span >
                <span className='md:text-4xl text-2xl text=bg-black font-mono'>US</span>
            </div>
            <div className='md:flex justify-center space-x-5'>
                <div>
                    <img className='w-[400px]' src='https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/otherImages%2F2148415904.webp?alt=media&token=b1d35433-5a20-4ad7-8579-bd39e93f4ab5' alt="" />
                </div>
                <div className='flex-col flex gap-10 p-10'>
                    <span className='text-2xl font-bold'>Our store</span>

                    <div className='text-gray-500 flex-col flex'>
                        <span >                    Egypt, Cairo
                        </span>
                        <span>                    Gize, 6 Octobar city zip
                        </span>

                    </div>

                    <div className='text-gray-500 flex-col flex'>

                        <span>                    Tel: +201013774006
                        </span>
                        <span>                    Email: uosryahmed23@gmail.com
                        </span>
                    </div>


                    <span className='text-2xl font-bold'>Careers at 3araby
                    </span>
                    <div className='text-gray-500'>
                        <span>Learn more about our teams and job openings.</span>

                    </div>


                </div>
            </div>



        </div>
    )
}
export default page