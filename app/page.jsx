"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config";
import Loading from "@/component/loading";
import Link from "next/link";
import { motion } from "framer-motion";
import { BestSaller } from "./collection/getCollection";
import { LATEST_COLLECTIONS } from "./collection/getCollection";
export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };;
  const [Data, setData] = useState([])



  async function GetBg() {
    try {
      const Data1 = await getDocs(collection(db, 'HomeBG'))
      const Data2 = Data1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setData(Data2[0].Images)

    }
    catch (Error) {
      console.log(Error);
    }
  } useEffect(() => {
    GetBg()
  }, [])



  return (
    <>
      {Data.length > 0 ? (
        <div className="w-full">
          {/* Hero Slider */}
          <div className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
            <Slider {...settings}>
              {[
                "https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2147825037.webp?alt=media&token=4e4e8af7-59cc-48ac-918b-c2d04234890f",
                "https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2148760653.webp?alt=media&token=ab847652-a336-4068-8698-7d8232d0c79e",
                "https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2148624967.webp?alt=media&token=854285a7-7e77-4d00-833b-2615cf338dcd"
              ].map((src, index) => (
                <div key={index} className="relative h-[60vh] md:h-[80vh] lg:h-[90vh]">
                  <img
                    src={src}
                    loading="lazy"
                    alt={`Slide ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                </div>
              ))}
            </Slider>

            {/* Overlay Text */}
            <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 z-20 text-left max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-sm md:text-lg lg:text-xl text-white font-light tracking-wider mb-2">
                  DISCOVER OUR COLLECTION
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
                  Latest Arrivals
                </h1>
                <p className="text-white/80 mb-6 hidden md:block">
                  Explore our newest styles and find your perfect look
                </p>
                <Link href="/collection">
                  <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300 font-medium">
                    SHOP NOW
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Latest Collections Section */}
          <div className="py-16 px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
                <span className="relative z-10">LATEST COLLECTIONS</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-black/80"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Explore our newest collection and be unique with our modern pieces crafted for your style
              </p>
            </motion.div>

            {/* Latest Collection Items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {LATEST_COLLECTIONS.map((item) => (
                <Link href={`/details/${item.id}`} key={item.id}>
                  <motion.div
                    className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image.src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        alt={item.name}
                      />
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full bg-white text-black py-2 rounded-md font-medium text-sm">
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-500 text-xs mb-1">{item.category || 'Fashion'}</p>
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="font-bold text-black">{item.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Best Sellers Header */}
            <motion.div
              className="text-center mt-20 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
                <span className="relative z-10">BEST SELLERS</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-black/80"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Explore our most popular pieces loved by our customers
              </p>
            </motion.div>

            {/* Best Sellers Items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {BestSaller.map((item) => (
                <Link href={`/details/${item.id}`} key={item.id}>
                  <motion.div
                    className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image.src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        alt={item.name}
                      />
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      <div className="absolute top-0 right-0 m-3">
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">BEST SELLER</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full bg-white text-black py-2 rounded-md font-medium text-sm">
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="font-bold text-black">{item.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}


