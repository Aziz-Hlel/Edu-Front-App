import { useState } from 'react';
import getUrl from '../../useContext/getUrl';
import DateComponent from './DateComponent';
import DowloadCom from '../Excel/Components/DowloadCom';
import download_archived_excel from './download_archived_excel';
import LoadingIcon from '../../lib/LoadingIcon';
import { twMerge } from 'tailwind-merge';
import getScroolBar from '../../lib/ScrollBar';
import { useQuery } from 'react-query';
import useAxios from '../../hooks/useAxios';
import { AxiosInstance } from 'axios';

export type HistoryProps = [string, "general" | "premiere"]



const fetch_history = async (axios: AxiosInstance) => {
    const url = getUrl();
    const response = await axios.get<HistoryProps[]>(url + 'retrieve/getHistoriqueDates');
    return response.data;
}


const Historique = () => {

    const axios = useAxios();   
    
    const { data: historyDates, isFetching } = useQuery('getHistoriqueDates', () => fetch_history(axios), { refetchOnWindowFocus: false })

    const [Dowloading, setDowloading] = useState(false);



    const download_excel = async (date: string) => {

        setDowloading(true);
        await download_archived_excel(date, axios);
        setDowloading(false);
    }


    return (
        <>
            <div className=' w-full h-full bg-transparent flex justify-center items-center' >
                {

                    <div className="   w-fit  h-5/6 ">


                        <div style={{ width: '43rem' }} className="bg-white rounded-xl shadow  p-7 h-full flex flex-col items-center  shadow-gray-400 ">

                            <div className=' pb-10 text-xl font-semibold w-full  sticky top-0 '>أرشيف نقل التلاميذ بين المدارس :</div>

                            <div className={twMerge(" pl-5", getScroolBar())}>

                                {
                                    !isFetching ?
                                        <div>
                                            {historyDates?.map((date_info, index) => {
                                                return <DateComponent key={index} date_info={date_info} download_excel={download_excel} />
                                            })

                                            }

                                        </div> :
                                        <LoadingIcon className=' w-10 h-10' />
                                }

                            </div>

                        </div >
                    </div >
                }
                {Dowloading && <DowloadCom />}
            </div >
        </>
    )
}

export default Historique;

