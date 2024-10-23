/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from "next/image";
import logo from "@/assets/images/logo.png";
import LoginCard from "@/components/LoginCard";
import loginImg from "@/assets/images/loginimg.png";
import Link from "next/link";
import { updatePasswordServiceAfterOtpVerified } from "@/service/admin-service";
import { toast } from "sonner";

export default function Home() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (newPassword === confirmPassword) {
      //Todo: Continue from here with send otp as well see backend in ref AND protect this route if otp exists in locally otherwise redirect to /forgot-password .....
        // const response = await updatePasswordServiceAfterOtpVerified()
    } else {
      toast.warning('Password must match')
    }
  };

  return (
    <div className=" ">
      <div className="grid md:grid-cols-2 gap-y-10 items-center">
        <div className=" bg-[#F5F7FA] flex flex-col justify-center lg:pl-[113px] md:pr-4 h-full">
          <div className="md:max-w-[418px] 2xl:mx-auto ">
            <Image src={logo} height={100} width={200} alt="" />
            <h1 className="main-title mt-[30px] md:mt-[94px] mb-[5px] md:mb-3 ">Create New Password</h1>
            <p className="login-desc mb-5 md:mb-10">Create a new password at least 8 digit long.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 md:mb-[17px]">
                <input type="password" name="newPassword" placeholder="Create Password" id="newPassword" />
              </div>
              <div className="mb-4 md:mb-[24px]">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" />
              </div>
              <button type="submit" className="button inline-block text-center md:leading-7 w-full bg-[#e87223] rounded-[5px] text-white text-base p-[15px]">
                Create New Password
              </button>
            </form>
            <p className="login-desc mt-[20px] md:mt-[153px] ">Copyright © 2020 - 2025 NeurCG.</p>
          </div>
        </div>
        <div className="waves">
          <div className="md:py-[125px] py-10 px-5 md:px-10  ">
            <LoginCard imgSrc={loginImg} />
          </div>
        </div>
      </div>
    </div>
  );
}