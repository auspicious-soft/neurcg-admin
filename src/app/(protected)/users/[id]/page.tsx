/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ReactLoading from 'react-loading';
import AvatarsCreated from '@/components/AvatarsCreated';
import Referral from '@/components/Referral';
import NeurcgCard from '@/components/NeurcgCard';
import useSWR from 'swr';
import { addCreditsService, getASingleUserService } from '@/service/admin-service';
import { getImageUrl } from '@/utils';
import Link from 'next/link';
import { toast } from 'sonner';

const ProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useParams()
  const [isPending, startTransition] = useTransition()
  const { data, isLoading, error } = useSWR(`/admin/users/${id}`, getASingleUserService)
  const [credits, setCredits] = useState<any>()
  const projectsData = data?.data?.data?.projects

  const handleCreditsChange = (e: any) => {
    setCredits(e.target.value)
  }
  const handleAddCredits = () => {
    if (credits <= 0) {
      return toast.warning('Please enter a valid amount')
    }
    if (credits > 200) {
      return toast.warning('You can only add a maximum of 200 credits at a time')
    }
    startTransition(async () => {
      try {
        const res = await addCreditsService(`/admin/users/add-credit/${id}`, { amount: credits })
        if (res.status == 200) {
          setCredits('')
          toast.success('Credits added successfully', { position: 'top-right' })
        }
      } catch (error) {
        toast.error('An error occurred adding credits')
      }
    })
  }
  return (
    <div className="">
      <Link href={'/users'} className='cursor-pointer p-4 mb-4'>
        &larr;   Back
      </Link>
      <h1 className="text-2xl font-bold mb-4 hidden">Customer Profile: {id}</h1>

      {/* Add more profile information here */}
      <div className="bg-white rounded-[8px] p-5 md:px-[52px] md:py-[45px] ">
        <div className="flex md:flex-row flex-col gap-y-4 justify-between md:items-center mb:mb-10">
          <div className="custom relative w-[177px] min-w-[177px] h-[177px] ">
            <input
              className="absolute top-0 left-0 h-full w-full opacity-0 p-0 cursor-pointer"
              type="file"
              disabled
              onChange={(Event) => {
                Event.preventDefault();
              }}
              accept="image/*"
            // onChange={handleImageChange}
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
                    src={getImageUrl(data?.data?.data?.user?.profilePic)}
                    alt="No image uploaded yet"
                    width={177}
                    height={177}
                    className="rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center items-center mt-5 gap-2'>
            <input type="number" value={credits} onChange={handleCreditsChange} className='bg-white text-black rounded-lg px-4 py-2 w-full' placeholder='Enter the amount of credits' />
            <button onClick={handleAddCredits} className='bg-[#E87223] text-white rounded w-40 p-3 max-w-40'>
              {!isPending ? 'Add Credits' : '...'}
            </button>
          </div>
        </div>
        <div className=' mt-[30px] '>
          <h1 className='text-xl md:text-[28px] text-[#3A2C23] font-semibold mb-[15px]'>{data?.data?.data?.user?.firstName} {data?.data?.data?.user?.lastName}</h1>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Email Address</p>
            {!isLoading ? <p className='values'>{data?.data?.data?.user?.email}</p> : <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />}          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Date Of Birth</p>
            {!isLoading ? <p className='values'>{new Date(data?.data?.data?.user?.dob).toLocaleDateString()}</p> : <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />}
          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Phone Number</p>
            {!isLoading ? <p className='values'>{data?.data?.data?.user?.phoneNumber ?? 'N/A'}</p> : <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />}
          </div>
          <div className='main-wrap flex justify-between items-center mb-3'>
            <p className='title'>Home Address</p>
            {!isLoading ? <p className='values'>{data?.data?.data?.user?.homeAddress}</p> : <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />}
          </div>
          <div className='main-wrap flex justify-between items-center '>
            <p className='title'>City And State</p>
            {!isLoading ? <p className='values'>{data?.data?.data?.user?.city ?? 'N/A'}, {data?.data?.data?.user?.state ?? 'N/A'}</p> : <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />}          </div>
        </div>
      </div>
      <div className='grid gap-5 md:grid-cols-2 my-5 md:my-[50px] '>
        {!isLoading ? <AvatarsCreated data={data?.data?.data?.avatarsUsed} /> : <div className="w-full h-full flex justify-center items-center">
          <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />
        </div>}
        {
          !isLoading ? <Referral data={data?.data?.data?.user} /> : <div className="w-full h-full flex justify-center items-center">
            <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />
          </div>
        }
      </div>
      <section className=''>
        <h2 className='section-title mb-[10px] md:mb-5'>Projects Created</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

          {projectsData?.map((data: any, _: any) => {
            if (!isLoading) {
              return (
                <NeurcgCard
                  key={data?._id}
                  title={data?.projectName}
                  thumbnail={getImageUrl(data?.projectAvatar)}
                  url={data?.projectVideoLink}
                />
              )
            }
            else {
              return (
                <div key={data?._id} className="w-full h-full flex justify-center items-center">
                  <ReactLoading type={'cylon'} color={'#e87223'} height={'40px'} width={'40px'} />
                </div>
              )
            }
          })}
        </div>
      </section>

    </div>
  );
};

export default ProfilePage;