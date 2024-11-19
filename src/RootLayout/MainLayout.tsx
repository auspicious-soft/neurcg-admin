/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import dp from "@/assets/images/wave-bg.png";
import { usePathname } from 'next/navigation';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const hideSideBar = ['/signup', '/login', '/forgotpassword', '/otp', '/newpassword'];
    const hideHeader = ['/signup', , '/login', '/forgotpassword', '/otp', '/newpassword'];
    const pathname = usePathname();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div>
                {!hideHeader.includes(pathname) &&
                    <Header
                        userImage={dp}
                        notificationsCount={3}
                        toggleSidebar={toggleSidebar}
                        isOpen={isSidebarOpen}
                    />
                }
            <div className="main-wrapper flex h-[calc(100vh-104px)] md:h-[calc(100vh-110px)] flex-col lg:flex-row lg:overflow-hidden">
            <div className="side-bar-layout flex-none"> 
            {!hideSideBar.includes(pathname) &&  <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                </div>
                <main className="main-layout flex-grow bg-[#F5F7FA] p-5 md:px-[35px] md:py-[40px] overflo-custom overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}