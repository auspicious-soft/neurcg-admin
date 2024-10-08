"use client"
import { NextLabel, PrevLabel } from '@/utils/svgIcons';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface Income {
  id: string;
  name: string;
  subscriptionType: string;
  amountPaid: string;
}

const dummyData: Income[] = [
  { id: '101', name: 'Shakimblee Brower', subscriptionType: 'Free', amountPaid: '$0' },
  { id: '102', name: 'bullock jamarr', subscriptionType: 'Premium', amountPaid: '$50' },
  { id: '103', name: 'Terrie Robbins', subscriptionType: 'Enterprise', amountPaid: '$200' },
  { id: '104', name: 'Sarah Rich', subscriptionType: 'Free', amountPaid: '$0' },
  { id: '105', name: 'Malaysia Hayes', subscriptionType: 'Premium', amountPaid: '$50' },
  { id: '106', name: 'Theresa Parham', subscriptionType: 'Enterprise', amountPaid: '$200' },
  { id: '107', name: 'Armani Wellman', subscriptionType: 'Free', amountPaid: '$0' },
];

const IncomeTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const rowsPerPage = 4;

  // Calculate pagination indexes
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Slice the current page rows from dummyData array
  const currentRows = dummyData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
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
            {currentRows.map((income) => (
              <tr key={income.id}>
                <td>#{income.id}</td>
                <td>{income.name}</td>
                <td>{income.subscriptionType}</td>
                <td className='text-right lg:!pr-[90px]'>{income.amountPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='text-right mt-5 md:mt-7'>
        <ReactPaginate
          previousLabel={<PrevLabel/>}
          nextLabel={<NextLabel />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(dummyData.length / rowsPerPage)} // Dynamic page count based on customers length
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