"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Logo from "@/assets/images/logo.png";
import { useState } from "react";
import { NotificationIcon, MenuIcon, ToggleClose } from "@/utils/svgIcons"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
interface HeaderProps {
  notificationsCount: number;
  userImage: string | StaticImageData;
  toggleSidebar: () => void;
  isOpen: boolean;
}
const Header: React.FC<HeaderProps> = ({
  notificationsCount,
  userImage,
  toggleSidebar,
  isOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const [showData, setShowData] = useState(false);
  const pathname = usePathname();

  const pageNames: { [key: string]: string } = {
    "/": "Home",
    "/income": "Income",
    "/users": "Users",
    "/profiles": "Users",
  };

  const currentPageName = pageNames[pathname] || "Users";

  // const handleDataShow = () => {
  //   setShowData(!showData);
  // };
  const handleLinkClick = () => {
    // setActiveLink(path);
    setShowData(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('https://neur-cg.vercel.app/');
  };
  
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
          <div className="relative flex">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <NotificationIcon />
              {notificationsCount > 0 && (
                <span className="absolute top-0 right-[1px] inline-block w-[6px] h-[6px] text-[0] font-bold text-white bg-[#E87223] rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute top-[25px] right-0 mt-2 w-[200px] md:w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1 text-sm text-gray-700">
                  <li className="px-4 py-2 border-b">
                    Re: Support Case (#12221)
                    <br />
                    <span className="text-xs text-gray-500">5h ago</span>
                  </li>
                  <li className="px-4 py-2 border-b">
                    Support Case (#12008)
                    <br />
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </li>
                  <li className="px-4 py-2">
                    Quam Dapibus Pharetra Bibendum
                    <br />
                    <span className="text-xs text-gray-500">Last week</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className=" cursor-pointer " onClick={()=> setShowData(!showData)}>
            <Image
              src={userImage}
              alt="User Profile"
              width={34}
              height={34}
              className="rounded-full"
            />
             
          </div>
          {showData && (
            <div className=" text-right absolute z-[2] top-[40px] right-0 w-[150px] h-[100px] bg-white p-5 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] ">
             <Link href="/my-profile" onClick={handleLinkClick}>
                <span className="text-[#3A2C23] text-base ">My Profile</span>
              </Link>
              <div>
              <a onClick={handleLogout}> 
                <span className="text-[#3A2C23] text-base">Log Out</span>
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