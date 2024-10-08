"use client";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'; 
import Link from "next/link";
import { IncomeIcon, HomeIcon, ProfileIcon, } from "@/utils/svgIcons" // Import Hamburger and Close icons


interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isOpen, toggleSidebar }: SideBarProps) => {
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path ? 'active' : '';

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden'); 
    } else {
      document.body.classList.remove('overflow-hidden'); 
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);


  return (
    <div className="side-bar z-2 relative overflo-custom h-[100%] overflow-y-scroll flex lg:flex-col justify-between">

      {/* Sidebar */}
      <div className={`fixed z-[3] flex flex-col justify-between overflo-custom  overflow-y-scroll lg:relative top-0 left-0 w-[2  px] h-full bg-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="pl-[30px] pt-[60px] md:pt-[38px] ">
          <ul className="navList">
            <li className={isActive('/')}>
              <Link href="/"
                onClick={handleLinkClick}
               >
                <HomeIcon/>
                <span>Home</span>
              </Link>
            </li>
            <li className={isActive('/users')}>
              <Link href="/users"  onClick={handleLinkClick}>
                <ProfileIcon />
                <span>Users</span>
              </Link>
            </li>
            {/* <p className="text-[#818999] text-[10px] font-medium mt-5 mb-[2px] pl-5">SERVICES</p> */}
            <li className={isActive('/income')}>
              <Link href="/income"  onClick={handleLinkClick}>
                <IncomeIcon />
                <span>Income</span>
              </Link>
            </li>
          </ul>
        </div>
       
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[1] bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
        
      )}
    </div>
  );
};

export default SideBar;
