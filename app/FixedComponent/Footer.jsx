import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-gray-100py-8 px-4 sm:px-6 mt-5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">3Arabys</h2>
                    <p className="max-w-2xl mx-auto">
                        Your go-to online store for trendy and affordable clothing for men, women, and kids.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between border-t border-gray-200 pt-8">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">WEBSITE</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-900 transition">Home</a></li>
                            <li><a href="/collection" className="hover:text-gray-900 transition">Collection</a></li>
                            <li><a href="/about" className="hover:text-gray-900 transition">About us</a></li>
                            <li><a href="/contact" className="hover:text-gray-900 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">GET IN TOUCH</h3>
                        <ul className="space-y-2">
                            <li>+201013774006</li>
                            <li>uosryamed23@gmail.com</li>
                            <li className=" flex flex-col space-x-4 mt-2">
                                <a href="" className="hover:text-gray-900 transition">Facebook</a>
                                <a href="https://api.whatsapp.com/send?phone=201013774006" className="hover:text-gray-900 transition">WhatsApp</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-8 pt-8 border-t border-gray-200 text-sm">
                    <p>Copyright © 2025 - Uosry - All Right Reserved.</p>
                </div>
            </div>
        </footer>
    )
}
