import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import MainLayout from "@/RootLayout/MainLayout";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "NeurCG",
  description: "",
};

export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className="">
          <MainLayout>
            {children}
          </MainLayout>
        </body>
      </SessionProvider>
    </html>
  )
}
