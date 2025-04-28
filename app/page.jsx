"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/image.jpg'
import img2 from '../assets/image2.jpg'
import img3 from '../assets/hand-drawn-fashion-shop-pattern-background_23-2150849915.avif'
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config";
import Loading from "@/component/loading";
export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };;
  const [Data, setData] = useState([])
  const ArrayOfLATEST_COLLECTION = [
    {
      "name": "Cloudknit Sweater",
      "price": "$45.99",
      "info": "Feather-light and impossibly soft",
      "category": "women",
      "type": "Topwear",
      "img": "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Rugged Timber Jacket",
      "price": "$129.99",
      "info": "Waxed canvas for all-weather protection",
      "category": "men",
      "type": "Winterwear",
      "img": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Sunbleached Denim",
      "price": "$59.95",
      "info": "Vintage wash with perfect distressing",
      "category": "men",
      "type": "Bottomwear",
      "img": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Starlight Tutu Dress",
      "price": "$38.50",
      "info": "Twirl-worthy for little dreamers",
      "category": "kids",
      "type": "Topwear",
      "img": "https://images.unsplash.com/photo-1596704017256-8eef1ffb1722?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Marble Lounge Pants",
      "price": "$34.99",
      "info": "Buttery soft with artistic print",
      "category": "women",
      "type": "Bottomwear",
      "img": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Neon Racer Tee",
      "price": "$22.99",
      "info": "Vibrant colors that pop",
      "category": "kids",
      "type": "Topwear",
      "img": "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Alpine Fleece Pullover",
      "price": "$65.00",
      "info": "Toasty warm for mountain adventures",
      "category": "men",
      "type": "Winterwear",
      "img": "https://images.unsplash.com/photo-1614249216823-7b4895e000b2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Seashell Wrap Blouse",
      "price": "$42.75",
      "info": "Flowy elegance for beach to brunch",
      "category": "women",
      "type": "Topwear",
      "img": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Cargo Jogger Hybrid",
      "price": "$49.95",
      "info": "Utility meets comfort with smart pockets",
      "category": "men",
      "type": "Bottomwear",
      "img": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    },
    {
      "name": "Marshmallow Puffer Vest",
      "price": "$58.99",
      "info": "Plush insulation without bulk",
      "category": "kids",
      "type": "Winterwear",
      "img": "https://images.unsplash.com/photo-1620231109648-302d034cb29b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&bg=gray"
    }
  ]
  const [Bestsaller, SetBestsaller] = useState([])
  const BESTSELLERS = [
    {
      name: " Men Round Neck Pure Cotton T- shirt",
      price: "$150",
      img: "https://decathlon.com.gh/cdn/shop/files/4f6a7b5f3a6175b15504284358575165_675x.progressive.jpg?v=1717164823"
    }
    , {
      name: "Women Round Neck Cotton Top",
      price: "$250",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kbPabTCgFXvDg1Kz7VzoZ9JhpsxIvLNE_Q&s"
    }
    , {
      name: "Girls Round Neck Cotton Top",
      price: "$150",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevBTDVZzomyA7WR_LlK8Vr316mTvOkI5A0w&s"
    }, {
      name: "Men Round Neck Pure Cotton T-shirt",
      price: "$100",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz740MsyW1DUXLAMp1AWQHWgMapUrSdDcFGw&s"
    },
    {
      name: "Men Round Neck Pure Cotton T-shirt",
      price: "$100",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz740MsyW1DUXLAMp1AWQHWgMapUrSdDcFGw&s"
    }
  ]


  const [GetLATEST_COLLECTION, SetLATEST_COLLECTION] = useState([])
  async function SET_LATEST_COLLECTION() {

    const Lates = collection(db, "LATEST_COLLECTION ")
    try {
      for (const item of ArrayOfLATEST_COLLECTION) {
        await addDoc(Lates, item)
      }
      console.log("add done");

    }
    catch (error) {
      console.log(error);
    }

  }
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
  }
  async function Get_LATEST_COLLECTION() {
    const latest = await getDocs(collection(db, 'LATEST_COLLECTION'))

    const products = latest.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }))
    SetLATEST_COLLECTION(products)
  }
  async function GetBestSaller() {
    const best = await getDocs(collection(db, "BESTSELLAR"))
    const dataofbest = best.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    SetBestsaller(dataofbest)
  }

  useEffect(() => {
    GetBg()
    // SET_LATEST_COLLECTION()
    Get_LATEST_COLLECTION()
    // console.log(ArrayOfLATEST_COLLECTION.length);
    GetBestSaller()



  }, []);

  return (

    Data.length > 0 ?
      <div className=" w-full  ">

        <div className="relative mt-3 h-[50vh] md:h-[90vh]  border-1 border-black bg-gray-300 overflow-hidden">
          <Slider {...settings}>
            <div className="flex justify-start  h-[100vh] md:h-[90vh]"   >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2147825037.webp?alt=media&token=4e4e8af7-59cc-48ac-918b-c2d04234890f"
                loading="lazy"
                alt="img1"
                className=" object-cover w-full h-full "
              />
            </div>
            <div className="flex justify-start  h-[100vh] md:h-[90vh]"   >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2148760653.webp?alt=media&token=ab847652-a336-4068-8698-7d8232d0c79e"
                loading="lazy"
                alt="img1"
                className=" object-cover w-full h-full "
              />
            </div>
            <div className="flex justify-start  h-[100vh] md:h-[90vh]"   >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/forever-ca320.appspot.com/o/mainPictures%2F2148624967.webp?alt=media&token=854285a7-7e77-4d00-833b-2615cf338dcd"
                loading="lazy"
                alt="img1"
                className=" object-cover w-full h-full "
              />
            </div>
          </Slider>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 text-left">
            <span className="block text-lg md:text-2xl lg:text-3xl text-blue-900 font-mono">
              <span className="text-3xl md:text-4xl lg:text-5xl">_______</span> OUR BESTSELLERS
            </span>
            <span className="block text-3xl md:text-5xl lg:text-7xl text-blue-950 font-mono leading-tight">
              Latest Arrivals
            </span>
            <span className="block text-lg md:text-2xl lg:text-3xl text-blue-900 font-mono mt-2 md:mt-4">
              SHOP NOW <span className="text-3xl md:text-4xl lg:text-5xl">_______</span>
            </span>
          </div>



        </div>
        <div className='flex justify-center mt=2 p-2 space-x-2'>
          <span className='md:text-4xl text-gray-500 font-mono'>LATEST
          </span >
          <span className='md:text-4xl text=bg-black font-mono'>COLLECTIONS</span>

        </div>
        <div className="flex justify-center text-shadow-black">
          <span>
            Explore our newest collection and be unique like our modern pieces

          </span>
        </div>

        <div className="flex flex-wrap ">
          {GetLATEST_COLLECTION.map((item) => (
            <div
              className='flex flex-col items-center  w-1/2 md:w-1/4 p-4   '
              key={item.id}
            >
              <img
                src={item.img}
                className="w-full h-64 object-cover hover:cursor-pointer hover:scale-105 duration-200"
                loading='lazy'
                width={300}
                height={300}
                alt={item.name}
              />
              <div className="text-center w-full">
                <p className='text-gray-700 font-medium'>{item.name}</p>
                <p className='font-bold text-lg mt-1'>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt=2 p-2 space-x-2'>
          <span className='md:text-4xl text-gray-500 font-mono'>BEST



          </span >
          <span className='md:text-4xl text=bg-black font-mono'>SELLERS</span>

        </div>
        <div className="flex justify-center text-shadow-black">
          <span>
            Explore our best collection and our people's favourite pieces

          </span>
        </div>

        <div className="flex flex-wrap ">
          {Bestsaller.map((item) => (
            <div
              className='flex flex-col items-center  w-1/2 md:w-1/4 p-4   '
              key={item.id}
            >
              <img
                src={item.img}
                className="w-full h-64 object-cover hover:cursor-pointer hover:scale-105 duration-200"
                loading='lazy'
                width={300}
                height={300}
                alt={item.name}
              />
              <div className="text-center w-full">
                <p className='text-gray-700 font-medium'>{item.name}</p>
                <p className='font-bold text-lg mt-1'>{item.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      : <Loading />
  )





}
