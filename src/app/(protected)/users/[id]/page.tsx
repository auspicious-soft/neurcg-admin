/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { EditImgIcon } from '@/utils/svgIcons';
import previmg2 from "@/assets/images/previmg.png"
// import CreditScore from '@/components/CreditScore';
import AvatarsCreated from '@/components/AvatarsCreated';
import Referral from '@/components/Referral';
import thumbimg1 from "@/assets/images/video1.png"
import thumbimg2 from "@/assets/images/video2.png"
import thumbimg3 from "@/assets/images/video3.png"
import thumbimg4 from "@/assets/images/video4.png"
import NeurcgCard from '@/components/NeurcgCard';
import useSWR from 'swr';
import { getASingleUserService } from '@/service/admin-service';
import { getImageUrl } from '@/utils';

// const CreditScores =[
//   {
//     id: 1,
//     text: "Animation Credit Left",
//     value: 148,
//   },
//   {
//       id: 2,
//       text: "Audio Upload Credit Left",
//       value: 48,
//     },
//     {
//       id: 3,
//       text: "Avatar Creation Credit Left",
//       value: 18,
//     },
// ] 
const VideoData = [
  {
    id: 1,
    title: "Lorem Ipsum Dummy Title",
    thumbnail: thumbimg1,
    url: "https://youtu.be/K4TOrB7at0Y?si=zFMHw8k0jDjXiGMi"
  },
  {
    id: 2,
    title: "Lorem Ipsum Dummy Title",
    thumbnail: thumbimg2,
  },
  {
    id: 3,
    title: "Lorem Ipsum Dummy Title",
    thumbnail: thumbimg3
  },
  {
    id: 4,
    title: "Lorem Ipsum Dummy Title",
    thumbnail: thumbimg4
  },
]
const ProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(`/admin/users/${id}`, getASingleUserService)
  console.log('data: ', data);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        // setFormData((prevData) => ({
        //   ...prevData,
        //   image: result,
        // }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const projectsData = data?.data?.data?.projects
  console.log('projectsData: ', projectsData);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 hidden">Customer Profile: {id}</h1>

      {/* Add more profile information here */}
      <div className="bg-white rounded-[8px] p-5 md:px-[52px] md:py-[45px]">
        <div className="flex md:flex-row flex-col gap-y-4 justify-between md:items-center mb:mb-10">
          <div className="custom relative w-[177px] min-w-[177px] h-[177px] ">
            <input
              className="absolute top-0 left-0 h-full w-full opacity-0 p-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={177}
                  height={177}
                  fill
                  className="rounded-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="grid place-items-center h-full w-full">
                <div>
                  <Image
                    src={previmg2}
                    alt="upload"
                    width={177}
                    height={177}
                    className="rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=' mt-[30px] '>
          <h1 className='text-xl md:text-[28px] text-[#3A2C23] font-semibold mb-[15px]'>Marisa Love</h1>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Email Address</p>
            <p className='values'>{data?.data?.data?.user?.email}</p>
          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Date Of Birth</p>
            <p className='values'>{data?.data?.data?.user?.dob}</p>
          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Phone Number</p>
            <p className='values'>+1 545 458 5236</p>
          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Home Address</p>
            <p className='values'>1024, lorents road</p>
          </div>
          <div className='main-wrap flex justify-between items-center '>
            <p className='title'>City And State</p>
            <p className='values'>Arizona, US</p>
          </div>
        </div>
      </div>
      <div className='grid gap-5 md:grid-cols-2 my-5 md:my-[50px] '>
        <AvatarsCreated data={data?.data?.data?.avatarsUsed} />
        <Referral data={data?.data?.data?.user} />
      </div>
      <section className=''>
        <h2 className='section-title mb-[10px] md:mb-5'>Projects Created</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

          {projectsData?.map((data: any, _: any) => (
            <NeurcgCard
              key={data?._id}
              title={data?.projectName}
              thumbnail={getImageUrl(data?.projectAvatar)}
              url={data?.projectVideoLink}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProfilePage;