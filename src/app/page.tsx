/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import IncomeGraph from "@/components/IncomeGraph";
import UserCards from "@/components/UserCards";
import UsersGraph from "@/components/UsersGraph";
import React, { useEffect, useState } from "react";
import NewUserCard from "@/components/NewUserCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { getDashboardStatsService } from "@/service/admin-service";
import ReactLoading from 'react-loading';
import { getImage } from "@/utils";
import profilePic from "@/assets/images/wave-bg.png";

export default function Home() {
  const session = useSession()
  const [userImages, setUserImages] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (!session.data) redirect('/login')
  }, [session])

  const { data, isLoading, error } = useSWR('/admin/dashboard', getDashboardStatsService)
  
  // Fetch images for new users
  useEffect(() => {
    const fetchUserImages = async () => {
      if (data?.data?.data?.newUsersData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imagePromises = data.data.data.newUsersData.map(async (user: any) => {
          const image = await getImage(user);
          return { [user._id]: image };
        });

        console.log('imagePromises: ', imagePromises);
        const imageResults = await Promise.all(imagePromises);
        console.log('imageResults: ', imageResults);
        const imagesMap = imageResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        console.log('imagesMap: ', imagesMap);
        setUserImages(imagesMap);
      }
    };

    fetchUserImages();
  }, [data]);

  const incomeThisMonth = data?.data?.data?.incomeThisMonth as number
  const UserData = data?.data?.data?.newUsersData
  const useCardData = [
    {
      id: 1,
      text: "New User",
      value: data?.data?.data?.newUsers as number,
    },
    {
      id: 2,
      text: "Normal User",
      value: data?.data?.data?.normalUsers as number,
    },
    {
      id: 3,
      text: "Premium User",
      value: data?.data?.data?.proUsers as number,
    },
    {
      id: 4,
      text: "Total User",
      value: data?.data?.data?.totalUsers as number,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#e87223'} height={'40px'} width={'40px'} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-5 ">
        <IncomeGraph incomeThisMonth={incomeThisMonth} incomeData={data?.data?.data?.incomeData} />
        <UsersGraph userData={data?.data?.data?.usersGrowth} />
      </div>
      <section className="my-5 md:my-10">
        <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {useCardData.map((data) => (
            <UserCards
              key={data.id}
              value={data.value}
              text={data.text}
            />
          ))}
        </div>
      </section>
      <section>
        {UserData?.length > 0 && <h2 className="section-title mb-5">New Users</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {UserData?.map((data: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            profilePic: string;
          }) => (
            <NewUserCard
              key={data?._id}
              userId={data?._id}
              title={`${data?.firstName} ${data?.lastName}`}
              thumbnail={userImages[data?._id] || profilePic}
            />
          ))}
        </div>
      </section>
    </div>
  );
}