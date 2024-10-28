"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Logo from "@/assets/images/logo.png";
import { useState } from "react";
import { MenuIcon, ToggleClose } from "@/utils/svgIcons"
import { usePathname } from "next/navigation";
import { signOut } from "@/auth"
interface HeaderProps {
  notificationsCount: number;
  userImage: string | StaticImageData;
  toggleSidebar: () => void;
  isOpen: boolean;
}
const Header: React.FC<HeaderProps> = ({
  userImage,
  toggleSidebar,
  isOpen,
}) => {
  const [showData, setShowData] = useState(false);
  const pathname = usePathname();

  const pageNames: { [key: string]: string } = {
    "/": "Home",
    "/income": "Income",
    "/users": "Users",
    "/profiles": "Users",
  "/notifications" : "Notifications",
    "/avatars": "Avatars",
  };
 
  const currentPageName = pageNames[pathname] || "Users";

  // const handleDataShow = () => {
  //   setShowData(!showData);
  // };
  // const handleLinkClick = () => {
  //   // setActiveLink(path);
  //   setShowData(false);
  // }

  return (
    <header className="flex justify-between items-center p-5  md:py-[23px] md:px-[30px] bg-white ">
       
      <div className="lg:min-w-[270px] ">
        <Link href="/">
          <Image
            src={Logo}
            alt=""
            height={100}
            width={200}
            className="max-w-[120px] md:max-w-[158px] "
          />
        </Link>
      </div>
      <div className="flex items-center justify-end lg:justify-between w-full ">
        <h1 className="hidden lg:block section-title">{currentPageName}</h1>

        <div className="flex items-center space-x-[15px] md:space-x-[30px] relative">
          <div className=" cursor-pointer " onClick={()=> setShowData(!showData)}>
            <Image
              src={userImage}
              alt="User Profile"
              width={34}
              height={34}
              className="rounded-full w-10 h-10"
            />
             
          </div>
          {showData && (
            <div className="text-right absolute z-[2] top-[40px] right-0 w-[150px] h-auto bg-white p-3 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] ">
             {/* <Link href="/my-profile" onClick={handleLinkClick}>
                <span className="text-[#3A2C23] text-base ">My Profile</span>
              </Link> */}
              <div>
              <a onClick={async() => await signOut({ redirect: true, redirectTo: "/login" })} > 
                <span className="text-[#e87223] text-base cursor-pointer font-bold flex items-center justify-center" >Log Out</span>
              </a>
              </div>
            </div>
          )}
        </div>
        <button 
        className="block lg:hidden z-[3] ml-[15px] " 
        onClick={toggleSidebar}
      >
        {isOpen ? <ToggleClose /> : <MenuIcon />} 
      </button>
      </div>
    </header>
  );
};

export default Header;