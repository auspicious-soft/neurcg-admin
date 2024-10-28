'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import LoginCard from "@/components/LoginCard";
import loginImg from "@/assets/images/loginimg.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import { useSession } from "next-auth/react";
import { loginAction } from "@/actions";


export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async () => {
    if (!email || !password) return toast.error('All fields are required');
    const resss = await loginAction({ email, password });
    if (resss?.success) {
      toast.success('Logged in successfully');
      window.location.href = '/';
    } else {
      toast.error(Array.isArray(resss?.message) ? resss?.message[0].message : resss?.message);
    }
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-y-10 items-center">
        <div className="bg-[#F5F7FA] flex flex-col justify-center lg:pl-[113px] md:pr-4 h-full">
          <div className="md:max-w-[418px] 2xl:mx-auto">
            <Image src={logo} height={100} width={200} alt="Logo" />
            <h1 className="main-title mt-[30px] md:mt-[94px] mb-[5px] md:mb-3">Login</h1>
            <p className="login-desc mb-5 md:mb-10">Login to your account and see the magic of AI.</p>
            <div>
              <div className="mb-2 md:mb-[17px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <p className="text-right mb-[19px]">
                <Link href="/forgotpassword" className="login-desc">Forgot Password?</Link>
              </p>
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="button inline-block text-center md:leading-7 w-full bg-[#e87223] rounded-[5px] text-white text-base p-[15px]"
                >
                  Login
                </button>
              </div>
            </div>
            <p className="login-desc mt-[20px] md:mt-[153px]">Copyright © 2020 - 2025 NeurCG.</p>
          </div>
        </div>
        <div className="waves">
          <div className="md:py-[125px] py-10 px-5 md:px-10">
            <LoginCard imgSrc={loginImg} />
          </div>
        </div>
      </div>
    </div>
  );
}