import { Outlet } from "react-router-dom";
import SchoolsTable from "./SchoolsTable";
import StatsCards from "./StatsCards";
import { SchoolsInfoContextProvider } from "../../useContext/SchoolsInfoContext";





const Stats = () => {





    

    return (
        <>
            <div className=" w-full h-full flex flex-col " >

                <StatsCards />

                <SchoolsInfoContextProvider>

                    <SchoolsTable />
                    <Outlet />
                </SchoolsInfoContextProvider>




            </div >

        </>
    )
}

export default Stats;
