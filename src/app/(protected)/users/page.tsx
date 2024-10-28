/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import SearchBar from '@/components/SearchBar'
import UserTable from '@/components/UserTable';
import { getAllUserService } from '@/service/admin-service';
import React from 'react'
import useSWR from 'swr';


export default function Page() {
  const [query, setQuery] = React.useState('')
  const { data, isLoading, error } = useSWR(`/admin/users?${query}`, getAllUserService, { revalidateOnFocus: false })
  const usersData = data?.data
  return (
    <div>
      <div className='flex justify-end mb-5'>
        <SearchBar setQuery={setQuery} />
      </div>
      <UserTable usersData={usersData} setQuery={setQuery} isLoading={isLoading} />
    </div>
  )
}