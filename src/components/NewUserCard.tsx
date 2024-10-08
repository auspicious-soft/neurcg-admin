"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface VideoCardProps {
  title: string;
  thumbnail?: string | StaticImageData; // Optional thumbnail
}

const NewUserCard: React.FC<VideoCardProps> = ({ title, thumbnail }) => {
  return (
    <>
      <div className="p-1 rounded-lg bg-white cursor-pointer">
        <div className="player-wrapper relative">
          {thumbnail &&
            <Image
              src={thumbnail}
              alt={title}
              className="w-full h-auto rounded-lg"
              width={500} // Adjust this size as needed
              height={300} // Adjust this size as needed
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
