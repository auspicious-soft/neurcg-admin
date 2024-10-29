"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Logo from "@/assets/images/logo.png";
import { MenuIcon, ToggleClose } from "@/utils/svgIcons";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions";


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
  // const router = useRouter()
  const pageNames: { [key: string]: string } = {
    "/": "Home",
    "/income": "Income",
    "/users": "Users",
    "/profiles": "Users",
    "/notifications": "Notifications",
    "/avatars": "Avatars",
  };

  const currentPageName = pageNames[pathname] || "Users";

  const handleSignOut = async () => {
    const res = await logoutAction();
    console.log('res: ', res);
    if (res === true) {
      window.location.reload()
    }
  };

  return (
    <header className="flex justify-between items-center p-5 md:py-[23px] md:px-[30px] bg-white">
      <div className="lg:min-w-[270px]">
        <Link href="/">
          <Image
            src={Logo}
            alt=""
            height={100}
            width={200}
            className="max-w-[120px] md:max-w-[158px]"
          />
        </Link>
      </div>
      <div className="flex items-center justify-end lg:justify-between w-full">
        <h1 className="hidden lg:block section-title">{currentPageName}</h1>

        <div className="flex items-center space-x-[15px] md:space-x-[30px] relative">
          <div className="cursor-pointer" onClick={() => setShowData(!showData)}>
            <Image
              src={userImage}
              alt="User Profile"
              width={34}
              height={34}
              className="rounded-full w-10 h-10"
            />
          </div>
          {showData && (
            <div className="text-right absolute z-[2] top-[40px] right-0 w-[150px] h-auto bg-white p-3 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.08)]">
              <div>
                <button
                  onClick={handleSignOut}
                  className="text-[#e87223] text-base cursor-pointer font-bold flex items-center justify-center w-full"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className="block lg:hidden z-[3] ml-[15px]"
          onClick={toggleSidebar}
        >
          {isOpen ? <ToggleClose /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;