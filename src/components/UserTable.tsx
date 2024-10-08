import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { NextLabel, PrevLabel } from '@/utils/svgIcons';

interface User {
  id: string;
  name: string;
  subscriptionType: string;
  email: string;
}

interface UserTableProps {
  customers: User[];
}

const UserTable: React.FC<UserTableProps> = ({ customers }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const rowsPerPage = 2; 
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleViewProfile = (id: string) => {
    router.push(`/profiles/${id}`);
  };

  return (
    <div>
      <div className="table-common overflow-x-auto">
        <table>
          <thead>
            <tr >
              <th>ID</th>
              <th>Customer</th>
              <th>Subscription Type</th>
              <th>Email Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((customer, index) => (
              <tr key={customer.id} className={`${index % 2 === 0 ? 'bg--100' : 'bg-whi'}`}>
                <td>#{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.subscriptionType}</td>
                <td>{customer.email}</td>
                <td>
                  <button
                    onClick={() => handleViewProfile(customer.id)}
                    className="text-[#26395E] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-5 md:mt-7">
        <ReactPaginate
          previousLabel={<PrevLabel/>}
          nextLabel={<NextLabel />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(customers.length / rowsPerPage)} // Dynamic page count based on customers length
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

export default UserTable;