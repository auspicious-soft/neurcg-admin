/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import IncomeTable from '@/components/IncomeTable'
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'
import useSWR from 'swr'
import { getIncomeService } from '@/service/admin-service';

export default function page() {
  const [query, setQuery] = useState('')
  const { data, isLoading, error } = useSWR(`/admin/income?${query}`, getIncomeService, { revalidateOnFocus: false })
  const incomeData = data?.data
  return (
    <div>
      <div className='flex justify-end mb-5'>
        <SearchBar setQuery={setQuery} />
      </div>
      <div>
        <IncomeTable incomeData = {incomeData} setQuery = {setQuery}/>
      </div>

    </div>
  )
}