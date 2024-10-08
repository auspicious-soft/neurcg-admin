import IncomeTable from '@/components/IncomeTable'
import SearchBar from '@/components/SearchBar'
import React from 'react'

export default function page() {
  return (
    <div>
     <div className='flex justify-end mb-5'>
      <SearchBar />
      </div>
      <div>
        <IncomeTable/>
      </div>
     
    </div>
  )
}