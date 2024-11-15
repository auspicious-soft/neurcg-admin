/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import img1 from "@/assets/images/video1.png";
import img2 from "@/assets/images/video2.png";
import img3 from "@/assets/images/video3.png";
import img4 from "@/assets/images/video4.png";
import { getImageUrl } from '@/utils';

//const UserTable: React.FC<UserTableProps> = ({ customers }) => {
const AvatarsCreated = (props: any) => {
  const { data } = props
  return (
    <div className="bg-white rounded-[8px] p-5 md:p-[30px] ">
      <h2 className="section-title mb-6">Avatars Created</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-[14px] justify-center">
        {data?.slice(0, 10)?.map((src:any, index:any) => (
          <div key={index} >
            <Image
              width={100}
              height={100}
              src={getImageUrl(src)}
              alt={`Avatar ${index + 1}`}
              objectFit="cover"  // Ensures the image covers the space className="w-[86px] h-[86px] relative"
              className="rounded-[4px] w-full aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AvatarsCreated;