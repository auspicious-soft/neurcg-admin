/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import dp from "@/assets/images/profilepic.png";
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
            <div>
                {!hideHeader.includes(pathname) &&
                    <Header
                        userImage={dp}
                        notificationsCount={3}
                        toggleSidebar={toggleSidebar}
                        isOpen={isSidebarOpen}
                    />
                }
            </div>
            <div className="layout">
                {!hideSideBar.includes(pathname) && <div className="layout-left">
                    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                }
                <main className="layout-right overflo-custom ">
                    {children}
                </main>
            </div>
        </div>
    );
}