import ElvToTransfer from "./Components/EditElv/ElvToTransfer";
import DownloadExcelCom from "./Components/DownloadExcelCom";
import UidInput_Component from "./Components/UidInput_Component";
import { useAuth } from "../../useContext/AuthContext";
import Table from "./Components/Table/Table";
import { SchoolsInfoContextProvider } from "../../useContext/SchoolsInfoContext";


export interface Eleve {
    id: number;
    name: string;
    fatherName: string;
    dob: String | null;
    level: string;
    prev_ecole: string;
    prev_ecole_id: number;
    Del1: string;
    Del1_id: number;
    next_ecole: string;
    next_ecole_id: number;
    reason: string;
    decision: string;
    decision_id: number;
    comments?: string;
}



const Excel = () => {



    const { isAdmin } = useAuth();







    return (

        <>
            <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center  2xl:mt-12   w-full  " >



                    {isAdmin && <DownloadExcelCom />}

                    <UidInput_Component />

                    <div className=" h-14" />

                    <SchoolsInfoContextProvider>

                        <ElvToTransfer />

                    </SchoolsInfoContextProvider>


                    <div className=" 2xl:h-20 " />



                    <Table />


                </div>
            </div>


        </>
    )
}

export default Excel;

