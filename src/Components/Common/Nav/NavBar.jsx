"use client";
import React from "react";
import "./NavBar.css";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
function NavBar() {
  return (
    <div className="w-full h-[90px] fixed top-0 z-[40] flex items-center justify-between">
      <div className="logo__continer z-[200] flex items-center justify-center relative h-full bg-[#e5e5e5] w-[12rem] rounded-br-[28px]">
        <Image
          className="w-[10rem] h-[45px] translate-y-[10px] translate-x-[10px]"
          src={"/logo.png"}
          alt="SanthiGearsLogo"
          width={1080}
          height={1024}
        />
      </div>
      <div className="menu__continer group cursor-pointer  relative h-full bg-[#e5e5e5] pr-12 pl-5  w-fit flex items-center justify-center rounded-bl-[28px] ">
        <span
          className="group-hover:block mr-5 hidden  text-lg font-bold w-[20px] h-[20px] rounded-full"
          style={{ background: "linear-gradient(90deg, #ff9000, #cf1e00)" }}
        />

        <div className="menu__text mr-5 group-hover:hidden block">
          <span
            className="text-lg font-bold"
            style={{
              background: "linear-gradient(90deg, #ff9000, #cf1e00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MENU
          </span>
        </div>

        <div className="menu__items font-audiowide  items-center justify-center gap-12 flex  group-hover:w-[40rem] overflow-hidden w-0 transition-all duration-1000 ease-in-out">
          <Link
            className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-[#ff9000] after:to-[#cf1e00]"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-[#ff9000] after:to-[#cf1e00]"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-[#ff9000] after:to-[#cf1e00]"
            href="/"
          >
            Services
          </Link>
          <Link
            className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-[#ff9000] after:to-[#cf1e00]"
            href="/resource"
          >
            Resource
          </Link>
          <Link
            className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-[#ff9000] after:to-[#cf1e00]"
            href="/"
          >
            Contact
          </Link>
        </div>
        <div className="menu__button ml-5">
          <div className="menu__button__icon">
            <Menu className="w-[1.5rem] h-[1.5rem] text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavBar };
