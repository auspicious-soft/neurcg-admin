"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface VideoCardProps {
  title: string;
  thumbnail?: string | StaticImageData; // Optional thumbnail
  userId?: string;
}

const NewUserCard: React.FC<VideoCardProps> = ({ title, thumbnail, userId }) => {
  const router = useRouter();
  return (
    <>
      <div className="p-1 rounded-lg bg-white cursor-pointer" onClick={()=> {
        router.push(`/users/${userId}`)
      }}>
        <div className="player-wrapper relative">
          {thumbnail &&
            <Image
              src={thumbnail}
              alt={title}
              className="w-full !h-[300px] rounded-lg object-cover"
              width={500} 
              height={300}
              layout="responsive"
            />
          }
          <div className="mt-[15px] mb-[11px] flex items-center gap-[10px] px-[14px]">
            <h3 className="text-[#3A2C23] font-medium text-sm leading-[normal] ">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUserCard;
