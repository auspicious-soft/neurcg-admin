/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import SearchBar from '@/components/SearchBar'
import UserTable from '@/components/UserTable';
import { getAllUserService } from '@/service/admin-service';
import React from 'react'
import useSWR from 'swr';
import ReactLoading from 'react-loading';


export default function Page() {
  const [query, setQuery] = React.useState('')
  const { data, isLoading, error } = useSWR(`/admin/users?${query}`, getAllUserService, { revalidateOnFocus: false })
  const usersData = data?.data
 if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#e87223'} height={'40px'} width={'40px'} />
      </div>
    );
  }
  return (
    <div>
      <div className='flex justify-end mb-5'>
        <SearchBar setQuery={setQuery} />
      </div>
      <UserTable usersData={usersData} setQuery = {setQuery}/>
    </div>
  )
}