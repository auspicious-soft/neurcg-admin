import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import MainLayout from "@/RootLayout/MainLayout";

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
      <body className="">
    <MainLayout>
      {children}
    </MainLayout>
      </body>
    </html>
  );
}
