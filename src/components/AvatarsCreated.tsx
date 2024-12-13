/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LoadingGif from '@/assets/loading-gif.gif'
import { getAvatarsUsedFromFlask } from '@/utils';


//const UserTable: React.FC<UserTableProps> = ({ customers }) => {
const AvatarsCreated = (props: any) => {
  const { data } = props
  const [avatrarCreatedImages, setAvatarCreatedImages] = useState<any>([])

  useEffect(() => {
    const fetchAvatarsUsedFromFlask = async () => {
      if (data) {
        const imagePromises = data?.map(async (avatar: any) => {
          const imageUrl = await getAvatarsUsedFromFlask(avatar);
          return imageUrl
        });

        const imageResults = await Promise.all(imagePromises);
        setAvatarCreatedImages(imageResults);
      }
    };

    fetchAvatarsUsedFromFlask();
  }, [data]);
  return (
    <div className="bg-white rounded-[8px] p-5 md:p-[30px] ">
      <h2 className="section-title mb-6">Avatars Created</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-[14px] justify-center">
        {avatrarCreatedImages?.slice(0, 10)?.map((src: any, index: any) => (
          <div key={index} >
            <Image
              width={100}
              height={100}
              src={src ?? LoadingGif}
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