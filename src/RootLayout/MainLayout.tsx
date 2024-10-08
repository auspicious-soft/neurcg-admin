    "use client"
    import React, {useState} from 'react';
    import Header from '@/components/Header';
    import SideBar from '@/components/SideBar';
    import dp from "@/assets/images/profilepic.png";

    export default function MainLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

        const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

        return (
            <div>
            <div>
            <Header 
            userImage= {dp}
            notificationsCount={3} 
            toggleSidebar={toggleSidebar}
            isOpen={isSidebarOpen}
            />
            </div>
            <div className="layout">
            <div className="layout-left">
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/> 
            </div>    
            <main className="layout-right overflo-custom ">
                {children}
            </main>
            </div>     
            </div>
        );
    }

