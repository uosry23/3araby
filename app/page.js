"use client"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  return (
    <div className=" w-full ">

      <div className="flex justify-between flex-row w-full ">
        <div>
          <a href="/" >
            <span className="font-bold text-2xl">
              3 A r a b y
            </span>
          </a>
        </div>
        <ul class="flex space-x-6 mt-1">
          <li class="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Home
          </li>
          <li class="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Collection
          </li>
          <li class="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            About
          </li>
          <li class="relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Contact
          </li>
        </ul>

        <div className="mt-1 flex space-x-5 ">
          <FontAwesomeIcon icon="home" className="text-blue-500" />
        </div>
      </div>




    </div>
  );
}
