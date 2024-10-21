"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextLabel, PrevLabel } from '@/utils/svgIcons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface Income {
  _id: string;
  planType: string;
  userName: string;
  planAmount: number;
}

interface IncomePageProps {
  incomeData: {
    total: number;
    data: Income[];
    page: number
    limit: number
  }
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const IncomeTable = (props: IncomePageProps) => {
  const { incomeData, setQuery } = props;
  const total = incomeData?.total ?? 0;
  const rowsPerPage = 10;
  const currentIncome = incomeData?.data ?? [];

  const handlePageClick = (selectedItem: { selected: number }) => {
     setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  };


  return (
    <div>
      <div className='table-common overflow-x-auto'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th className='lg:w-[15%] '>Subscription Type</th>
              <th className='!text-right lg:!pr-[90px] '>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            { currentIncome.length > 0 ? (
              currentIncome.map((income) => (
                <tr key={income._id}>
                  <td>#{income._id}</td>
                  <td>{income.userName}</td>
                  <td>{income.planType[0].toUpperCase() + income.planType.slice(1)}</td>
                  <td className='text-right lg:!pr-[90px]'>&#8364;{income.planAmount / 100}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='w-full flex justify-center p-3 items-center' colSpan={4}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='text-right mt-5 md:mt-7'>
        <ReactPaginate
          previousLabel={<PrevLabel />}
          nextLabel={<NextLabel />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)} // Dynamic page count based on customers length
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex bg-[#F5F6F8] rounded-[5px] border border-[#eb823c0f]'}
          pageClassName={'text-[#6B6B6B] '}
          pageLinkClassName={'py-[10px] text-xs px-[14px] inline-block'}
          activeClassName={'bg-[#E87223] rounded-[5px] text-white'}
          previousLinkClassName={'py-[10px] px-[14px] h-full flex items-center '}
          nextLinkClassName={'py-[10px] px-[14px]  h-full flex items-center '}
          activeLinkClassName={'bg-[#E87223] rounded-[5px] text-white'}
        />
      </div>
    </div>
  );
};

export default IncomeTable;