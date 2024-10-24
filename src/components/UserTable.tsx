/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { NextLabel, PrevLabel } from '@/utils/svgIcons';

const UserTable = (props: any) => {
  const { usersData , setQuery} = props;
  const total = usersData?.total ?? 0;
  const rowsPerPage = 10;
  const router = useRouter();
  const users = usersData?.data ?? [];

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  const handleViewProfile = (id: string) => {
    router.push(`/users/${id}`);
  };

  return (
    <div>
      <div className="table-common overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subscription Type</th>
              <th>Email Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                .map((customer: any, index: number) => (
                  <tr key={customer._id} className={`${index % 2 === 0 ? 'bg--100' : 'bg-whi'}`}>
                    <td>#{customer._id.slice(0, 5)}</td>
                    <td>{customer.firstName + ' ' + customer.lastName}</td>
                    <td>{customer.planType[0].toUpperCase() + customer.planType.slice(1)}</td>
                    <td>{customer.email}</td>
                    <td>
                      <button
                        onClick={() => handleViewProfile(customer._id)}
                        className="text-[#26395E] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="w-full flex justify-center p-3 items-center">
                <td colSpan={5}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-5 md:mt-7">
        <ReactPaginate
          previousLabel={<PrevLabel />}
          nextLabel={<NextLabel />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)}
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