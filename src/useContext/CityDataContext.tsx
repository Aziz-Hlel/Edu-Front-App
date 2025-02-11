import { createContext, useContext } from "react";
import useCityData from "../hooks/useCityData";


export type Del1sType = {
    [id: number]: string;
}

export type SchoolType = {
    id: number;
    name: string;

}

export type EcolesType = {
    [id: number]: {
        [sid: number]: SchoolType
    }
}

export type LevelStatType = {
    nbr_classes: number;
    nbr_st: number;
    nbr_leaving: number;
    nbr_comming: number;
}


export type LevelStatsType = {
    [id: number]: LevelStatType
}

type CityDataContextProps = {
    Del1Data: Del1sType;
    EcolesData: EcolesType;
    LevelStatData: LevelStatsType;
    refetchLevelStat: any;
}

const CityDataContext = createContext<CityDataContextProps | null>(null)


export const CityDataContextProvider = ({ children }: { children: React.ReactNode }) => {




    const { Del1Data, EcolesData, LevelStatData, refetchLevelStat } = useCityData();



    return (
        <>
            <CityDataContext.Provider value={{ Del1Data, EcolesData, LevelStatData, refetchLevelStat }}>
                {children}
            </CityDataContext.Provider>
        </>
    )

}




export default function useCityDataContext() {

    const context = useContext(CityDataContext);

    if (!context) {
        throw new Error(
            "useCityDataContext must be used in CityDataContextProvider"
        )
    }

    return context;
}
