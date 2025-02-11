import { useQuery } from "react-query"
import getUrl from "../useContext/getUrl";
import useAxios from "./useAxios";
import { AxiosInstance } from "axios";
import ApiGateway from "../ApiGateway/ApiGateway";
import { Del1sType, EcolesType, LevelStatsType } from "../useContext/CityDataContext";



const fetch_Del1s = async (axios: AxiosInstance) => {
    // const url = getUrl();
    // return await axios.get(url + 'retrieve/getDels') //mouch sur path l url exact
    return await axios.get(ApiGateway.dels);
}


const fetch_ecoles = async (axios: AxiosInstance) => {
    // const url = getUrl();
    // return await axios.get(url + 'retrieve/getEcoles');
    return await axios.get(ApiGateway.schools);
}


const fetch_levelStats = async (axios: AxiosInstance) => {
    // const url = getUrl();
    // return await axios.get(url + 'retrieve/getLevelStat');
    return await axios.get(ApiGateway.levelStats);

}


const transformToDel1sType = (Del1DataBeta: any, Del1Data: Del1sType) => {

    Del1DataBeta.forEach((del: any) => {
        Del1Data[del.id] = del.name; // Assuming `id` and `name` exist in the API response
    });
    return Del1Data;
}


const transformToEcolesType = (EcolesDataBeta: any, EcolesData: EcolesType) => {

    console.log("EcolesDataBeta", typeof (EcolesDataBeta), EcolesDataBeta)

    EcolesDataBeta.forEach((school: any) => {
        if (!EcolesData[school.delId]) EcolesData[school.delId] = {};

        EcolesData[school.delId][school.id] = school;
    });


}

const transformToLevelStatsType = (LevelStatDataBeta: any, LevelStatData: LevelStatsType) => {

    console.log("LevelStatDataBeta", typeof (LevelStatDataBeta), LevelStatDataBeta)
    console.log("aaaaaaaaaaa")
    LevelStatDataBeta.forEach((levelStat: any) => {
        LevelStatData[levelStat.id] = levelStat
    });

}

export const useEcolesData = () => {

    const axios = useAxios();

    const { data: Del1sQuery, } = useQuery('getDel1s', () => fetch_Del1s(axios), { cacheTime: 0, refetchOnWindowFocus: false })
    const { data: EcolesQuery, } = useQuery('getEcoles', () => fetch_ecoles(axios), { cacheTime: 0, refetchOnWindowFocus: false })

    const Del1Data: Del1sType = {};
    const EcolesData: EcolesType = {};

    if (Del1sQuery) transformToDel1sType(Del1sQuery.data.data, Del1Data);
    if (EcolesQuery?.data.data) transformToEcolesType(EcolesQuery.data["data"], EcolesData);


    return { Del1Data, EcolesData }
}


const useCityData = () => {

    const axios = useAxios();

    const { Del1Data, EcolesData } = useEcolesData();
    const { data: LevelStatQuery, refetch: refetchLevelStat } = useQuery('getLevelStat', () => fetch_levelStats(axios));

    const LevelStatData: LevelStatsType = {};

    if (LevelStatQuery?.data.data) transformToLevelStatsType(LevelStatQuery.data["data"], LevelStatData);

    return { Del1Data, EcolesData, LevelStatData, refetchLevelStat }
}


export default useCityData;
