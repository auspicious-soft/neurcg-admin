import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import MainLayout from "@/RootLayout/MainLayout";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";


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
          <Toaster richColors />
          <MainLayout>
            {children}
          </MainLayout>
        </body>
      </SessionProvider>
    </html>
  )
}
