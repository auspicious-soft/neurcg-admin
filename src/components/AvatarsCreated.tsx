/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import img1 from "@/assets/images/video1.png";
import img2 from "@/assets/images/video2.png";
import img3 from "@/assets/images/video3.png";
import img4 from "@/assets/images/video4.png";

// interface AvatarProps {
//   images: string[];  // Array of image URLs
// }
const avatarUrls = [
  img1,
  img2,
  img3,
  img4,
  img1,
  img2,
  img3,
  img4,
];
//const UserTable: React.FC<UserTableProps> = ({ customers }) => {
const AvatarsCreated = (props: any) => {
  const { data } = props
  return (
    <div className="bg-white rounded-[8px] p-5 md:p-[30px] ">
      <h2 className="section-title mb-6">Avatars Created</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-[14px] justify-center">
        {avatarUrls.map((src, index) => (
          <div key={index} >
            <Image
              src={src}
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