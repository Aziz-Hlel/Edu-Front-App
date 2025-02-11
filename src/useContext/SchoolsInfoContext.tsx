import { createContext, useContext } from "react";
import useSchoolsInfo, { SchoolsDataProps } from "../hooks/useSchoolsInfo";

type SchoolsInfoContextProps = {
    SchoolsData: SchoolsDataProps[],
    refetch_SchoolsData: any
}
const SchoolsInfoContext = createContext<SchoolsInfoContextProps>({ SchoolsData: [], refetch_SchoolsData: null })



export const SchoolsInfoContextProvider = ({ children }: { children: React.ReactNode }) => {


    const { SchoolsData, refetch_SchoolsData } = useSchoolsInfo();


    return (
        <>
            <SchoolsInfoContext.Provider value={SchoolsData ? { SchoolsData, refetch_SchoolsData } : { SchoolsData: [], refetch_SchoolsData: null }}>
                {children}
            </SchoolsInfoContext.Provider>
        </>
    )

}



export default function useSchoolsInfoContext() {

    const context = useContext(SchoolsInfoContext);

    // if (!context) {
    //     throw new Error(
    //         "useSchoolsInfoContext must be used in SchoolsInfoContextProvider"
    //     )
    // }

    return context;
};


