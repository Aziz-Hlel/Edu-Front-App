import { useQuery } from "react-query";
import getUrl from "../useContext/getUrl";
import { AxiosInstance } from "axios";
import useAxios from "./useAxios";


export type SchoolsDataProps = {
    sid: number;
    ministre_school_name: string;
    principal: string;
    del1_name: string;
    email: string;
    phone1: number | null;
    phone2: number | null;
}



const fetch_SchoolsInfo = async (axios: AxiosInstance): Promise<SchoolsDataProps[]> => {
    const url = getUrl();

    const response = await axios.get<SchoolsDataProps[]>(url + 'retrieve/getSchoolsInfo');
    return response.data;
}



const useSchoolsInfo = () => {

    const axios = useAxios();

    const { data: SchoolsData, refetch: refetch_SchoolsData } = useQuery<SchoolsDataProps[]>('getSchoolsInfo', () => fetch_SchoolsInfo(axios), {
        cacheTime: 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    return { SchoolsData, refetch_SchoolsData };
}



export default useSchoolsInfo;
