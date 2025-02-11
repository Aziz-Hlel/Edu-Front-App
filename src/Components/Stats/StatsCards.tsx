import { useQuery } from "react-query";
import getUrl from "../../useContext/getUrl";
import { AxiosInstance } from "axios";
import useAxios from "../../hooks/useAxios";


type StatsDicProps = {
    total: number;
    public: number;
    private: number;
    out_of_state: number;
    out_of_country: number;
}



const fetch_Stats = async (axios: AxiosInstance): Promise<StatsDicProps> => {
    const url = getUrl();

    const response = await axios.get<StatsDicProps>(url + 'retrieve/getStats');
    return response.data;
}

const StatsCards = () => {

    const axios = useAxios();

    const { data: StatsDic, } = useQuery<StatsDicProps>('getStats', () => fetch_Stats(axios), {
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })


    const calcul_pourcentage = (number_of_transfer: number | undefined) => {
        return number_of_transfer && StatsDic ? ((number_of_transfer / StatsDic.total) * 100).toFixed(0) : 0
    }

    return (
        <>
            <div className=" w-full  flex  2xl:pt-12 pt-8">

                <div
                    className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full  px-5 2xl:py-5 py-2.5 bg-white rounded-md shadow-xl border-r-4 border-blue-300 mr-5'>
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="2xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                paddingTop: "0.1rem", paddingBottom: "0.1rem"
                            }}
                                className="flex items-center text-xs font-extralight 2xl:font-medium px-3 bg-blue-200 text-blue-800 rounded-full" > 100 %</div>
                        </div>
                    </div>


                    <div>
                        <div className="font-bold text-5xl text-center">
                            {StatsDic ? StatsDic.total : "--"}
                        </div>
                        <div className="font-bold text-sm text-center">
                            جملة النقل
                        </div>
                    </div>
                </div>

                <div
                    className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full  px-5 2xl:py-5 py-2.5 bg-white rounded-md shadow-xl border-r-4 border-purple-300 mr-5'>
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="2xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{ paddingTop: '0.1em', paddingBottom: '0.1rem' }}
                                className="flex items-center text-xs px-3 bg-purple-200 text-purple-800 rounded-full">{calcul_pourcentage(StatsDic?.public)}%</div>
                        </div>
                    </div>
                    <div >
                        <div className="font-bold text-5xl text-center">
                            {StatsDic ? StatsDic.public : "--"}
                        </div>
                        <div className="font-bold text-sm">
                            النقل من العمومي
                        </div>
                    </div>
                </div>

                <div
                    className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full  px-5 2xl:py-5 py-2.5 bg-white rounded-md shadow-xl border-r-4 border-red-300 mr-5'>
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="2xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{ paddingTop: '0.1em', paddingBottom: '0.1rem' }}
                                className="flex items-center text-xs px-3 bg-red-200 text-red-800 rounded-full">{calcul_pourcentage(StatsDic?.private)}%</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-5xl text-center">
                            {StatsDic ? StatsDic.private : "--"}
                        </div>
                        <div className="font-bold text-sm">
                            النقل من الخاص
                        </div>
                    </div>
                </div>

                <div
                    className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full  px-5 2xl:py-5 py-2.5 bg-white rounded-md shadow-xl border-r-4 border-green-300 mx-5'>
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="2xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{ paddingTop: '0.1em', paddingBottom: '0.1rem' }}
                                className="flex items-center text-xs px-3 bg-green-200 text-green-800 rounded-full">{calcul_pourcentage(StatsDic?.out_of_state)}%</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-5xl text-center">
                            {StatsDic ? StatsDic.out_of_state : "--"}
                        </div>
                        <div className="font-bold text-sm">
                            النقل من خارج الولاية
                        </div>
                    </div>

                </div>

                <div
                    className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full  px-5 2xl:py-5 py-2.5 bg-white rounded-md shadow-xl border-r-4 border-orange-300 mx-5'>
                    <div className="flex justify-between w-full">
                        <div>
                            <div className="2xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{ paddingTop: '0.1em', paddingBottom: '0.1rem' }}
                                className="flex items-center text-xs px-3 bg-orange-200 text-orange-800 rounded-full">{calcul_pourcentage(StatsDic?.out_of_country)}%</div>
                        </div>
                    </div>
                    <div >
                        <div className="font-bold text-5xl text-center ">
                            {StatsDic ? StatsDic.out_of_country : "--"}
                        </div>
                        <div className="font-bold text-sm">
                            النقل من خارج الوطن
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}






export default StatsCards;
