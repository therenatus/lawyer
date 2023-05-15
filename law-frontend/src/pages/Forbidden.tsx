
import React from "react";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Forbidden = () => {
  return (
    <div className="inset-0 bg-[#1A2238] fixed flex w-full h-full items-center justify-center duration-300 transition-opacity">
      <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
        <div className="max-w-2xl text-center">
          <BiError className="mx-auto text-[#FF6A3D]  w-[100px] h-[100px] 5 duration-[100ms]" />
          <h1 className="text-xl sm:text-5xl tracking-widest text-white lg:text-7xl">
            Отказано в доступе
          </h1>
          <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link to="/">ДОМОЙ</Link>
              </span>
            </a>
          </button>
          {/* <p className="mt-6 lg:text-lg text-white">You can subscribe to our newsletter, and let you know when we are back</p> */}
        </div>
      </div>
    </div>
  );
};