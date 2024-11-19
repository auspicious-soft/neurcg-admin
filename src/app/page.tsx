/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import IncomeGraph from "@/components/IncomeGraph";
import UserCards from "@/components/UserCards";
import UsersGraph from "@/components/UsersGraph";
import React, { useEffect } from "react";
import NewUserCard from "@/components/NewUserCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { getDashboardStatsService } from "@/service/admin-service";
import ReactLoading from 'react-loading';

export default function Home() {
  const session = useSession()
  useEffect(() => {
    if (!session.data) redirect('/login')
  }, [session])

  const { data, isLoading, error } = useSWR('/admin/dashboard', getDashboardStatsService)
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
              key={data._id}
              title={data.firstName + ' ' + data.lastName}
              thumbnail={data.profilePic}
            />
          ))}
        </div>
      </section>
    </div>
  );
}