import { useState } from 'react';
import { useQuery } from 'react-query';
import getUrl from '../../useContext/getUrl';
import LoadingIcon from '../../lib/LoadingIcon';
import TableRow from './components/TableRow';
import Pagination_Display from './components/Pagination_Display';
import TableHead from './components/TableHead';
import useAxios from '../../hooks/useAxios';
import { AxiosInstance } from 'axios';


export type eleveSearchProp = [uid: string, nom_prenom: string, nom_pere: string, date_naissance: string, ecole__ministre_school_name: string]

const empty_elv: eleveSearchProp = ["", "", "", "", "",]


const isAdmin = getUrl() === 'http://localhost:80/api/';


const fetch_elv = async (axios: AxiosInstance) => {
  const nom_elve_input = document.getElementById('nom_eleve') as HTMLInputElement;
  const date_naissance_input = document.getElementById('date-naissance') as HTMLInputElement;

  const nom_elve = nom_elve_input.value
  const date_naissance = date_naissance_input.value

  const url = getUrl();

  // if (isAdmin) return axios.get(url + "Tunis/searchElv/" + nom_elve)

  if (date_naissance !== "") return await axios.get(url + "retrieve/searchElv/bydate/" + date_naissance)

  if (nom_elve !== "") return await axios.get(url + "retrieve/searchElv/byname/" + nom_elve)
}


const set_date_null = () => {
  const date_naissance_input = document.getElementById('date-naissance') as HTMLInputElement;
  date_naissance_input.value = ""
}


const set_name_null = () => {
  const nom_elve_input = document.getElementById('nom_eleve') as HTMLInputElement;
  nom_elve_input.value = ""
}



const Search = () => {

  const axios = useAxios();

  const { data, isFetching, refetch } = useQuery('search_elv', () => fetch_elv(axios), { enabled: false, cacheTime: 0, onSuccess: () => { set_current_page(1) } })

  let table_totalpage_numbers = 0;
  const [current_page, set_current_page] = useState(0);

  const number_of_rows_each_pagination = 8

  const elvs_array = data?.data as eleveSearchProp[]

  if (data) table_totalpage_numbers = Math.ceil(elvs_array.length / number_of_rows_each_pagination)

  const change_pagination_number = (page_number: number) => {
    if (page_number <= table_totalpage_numbers) set_current_page(page_number)
  }


  return (
    <div className=' w-full h-full bg-transparent'>


      <div className="2xl:px-8 2xl:py-14 px-4 py-8 mx-auto w-11/12 h-full ">
        <div className="bg-white rounded-xl shadow p-4 sm:p-7  h-full flex flex-col items-center  shadow-gray-400">
          <div className="flex flex-col bg-white border border-t-4 w-9/12  border-t-blue-600 border-b-4  border-b-blue-600 shadow-sm rounded-xl  h-24">

            {/* search_card */}
            <div className="p-4 md:p-5 flex space-x-8">


              {/* name_search */}
              <div className="relative pl-5 w-4/6 ">
                <input type="text" autoComplete='off' className="peer py-3 px-4 ps-12 block w-full bg-gray-100 border  border-transparent rounded-lg text-sm focus:border-blue-600 focus:outline focus:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none " placeholder="اسم التلميذ" id='nom_eleve' />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg className="flex-shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div className="absolute -inset-y-0  end-0 flex items-center  pe-6  peer-disabled:opacity-50 peer-disabled:pointer-events-none" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="gray" className="w-4 h-4 ml-2" onClick={set_name_null} >
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>


              {/* date_search */}
              <div className='relative   bg-gray-100  items-center border  border-transparent rounded-lg '>

                <input type="date" className="bg-gray-100 peer block w-400 py-3 pl-10 pr-2 border  border-transparent rounded-lg text-sm focus:border-blue-600 focus:outline focus:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none" id='date-naissance' />

                <div className='absolute -inset-y-0  end-0 flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="gray" className=" w-4 h-4 ml-2 " onClick={set_date_null}>
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                  </svg>
                </div>

              </div>

              {/* button */}

              <button type="button" className="flex justify-center items-center my-2  w-8 h-8 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={() => refetch()} disabled={isFetching}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              {isAdmin && <button type="button" className="flex justify-center items-center my-2  w-8 h-8 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none" onClick={() => refetch()} disabled={isFetching}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>}

            </div>
          </div>


          <div className="flex flex-col 2xl:mt-10 mt-5 w-11/12">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                {isFetching &&
                  <div className=' w-full flex items-center justify-center h-96'>
                    <LoadingIcon className='' />
                  </div >
                }
                {elvs_array && !isFetching && <div className="border rounded-lg shadow overflow-hidden  ">


                  {/* table */}

                  <table className="min-w-full divide-y divide-gray-200  w-11/12">

                    <thead className="bg-gray-50 ">
                      <TableHead />
                    </thead>

                    <tbody className="divide-y divide-gray-200 ">

                      {elvs_array.length !== 0 ?
                        elvs_array.map((eleve, index) => {
                          return index + 1 > (current_page - 1) * number_of_rows_each_pagination && index + 1 <= current_page * number_of_rows_each_pagination ? <TableRow key={eleve[0]} eleve={eleve} /> : null
                        })
                        :
                        <tr>
                          <td colSpan={5}>
                            <div className=' flex  justify-center text-lg py-8'>
                              لم يتم العثور على أي تلميذ
                            </div>
                          </td>
                        </tr>
                      }

                      {current_page === table_totalpage_numbers && elvs_array.length < table_totalpage_numbers * number_of_rows_each_pagination && [...Array(number_of_rows_each_pagination * table_totalpage_numbers - elvs_array.length)].map((_, index) => (
                        <TableRow key={index} eleve={empty_elv} />
                      ))}

                    </tbody>
                  </table>


                  {/* pagination */}

                  <Pagination_Display table_totalpage_numbers={table_totalpage_numbers} change_pagination_number={change_pagination_number} />


                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;










