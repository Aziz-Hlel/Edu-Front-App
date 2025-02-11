import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { elvs_remainingCapacity, kethefa, nbr_elvs_inLevel } from "../MainTable/functions/calcul_ecole";

import { LevelProp } from "../../App";
import useCityDataContext from "../../useContext/CityDataContext";
import { twMerge } from "tailwind-merge";
import Hemich_TableCell from "./Components/Hemich_TableCell";
import Kethefa_TableCell from "./Components/Kethefa_TableCell";
import LoadingIcon from "../../lib/LoadingIcon";
import Thead from "./Components/Thead";
import { useAuth } from "../../useContext/AuthContext";
import getScroolBar from "../../lib/ScrollBar";



const levels = {
    premiere: 1,
    deuxieme: 2,
    troisieme: 3,
    quatrieme: 4,
    cinquieme: 5,
    sixieme: 6,
}




const LevelComp = () => {

    const { Del1Data, EcolesData, LevelStatData } = useCityDataContext();
    const [del1_picked, set_del1] = useState<number>(0);
    const params = useParams();
    const level: number = levels[params.level as LevelProp]
    const CityData_isfetched = Del1Data && EcolesData && LevelStatData

    const { isAdmin: is_admin } = useAuth();

    useEffect(() => {

        if (Del1Data) {
            const first_key = Object.keys(Del1Data)[0];
            set_del1(Number(first_key));
        }
    }, [Del1Data]);






    if (!Del1Data) {

        return (
            <>
                <div className="top-0 bg-indigo-200/75   w-full px-10 flex justify-center overflow-y-scroll ">
                    <div className=" mt-40">
                        <LoadingIcon className="" />
                    </div>
                </div>
            </>
        )
    }



    return (
        <>

            <Outlet />

            <div className="flex flex-col w-full shadow-md  m-12 bg-white p-5 2xl:pt-20 ">



                <div className="flex py-5 w-full flex-wrap  ">

                    {Del1Data && Object.entries(Del1Data).map(([cityID, name]) => {
                        return (

                            <button key={cityID} onClick={() => set_del1(Number(cityID))}
                                className={twMerge("transition-colors border rounded-xl   text-gray-900 bg-white  mb-1   py-1.5 px-1.5  mx-1    2xl:text-sm text-xs  font-semibold whitespace-nowrap ",
                                    Number(cityID) === del1_picked && "bg-blue-600 text-white hover:bg-blue-600",
                                    Number(cityID) !== del1_picked && "hover:bg-blue-300"
                                )
                                }
                            >
                                {name}
                            </button >


                        )
                    })}

                </div>



                {/* table */}
                <div className={twMerge("relative flex-grow  ", getScroolBar())} >


                    <table className=" w-[calc(100%-1rem)] 2xl:text-sm text-xs text-left  rtl:text-right text-gray-500 select-none border-none ">
                        <Thead />

                        <tbody>

                            {CityData_isfetched && !!del1_picked && Object.entries(EcolesData[del1_picked]).map(([sid, school], index) => {

                                const lid = Number(String(sid) + String(level))

                                const current_nbr_elvs = nbr_elvs_inLevel(LevelStatData[lid].nbr_st, LevelStatData[lid].nbr_leaving, LevelStatData[lid].nbr_comming)
                                const zyeda_no9san = elvs_remainingCapacity(current_nbr_elvs, LevelStatData[lid].nbr_classes)
                                const nbr_kethefa = kethefa(current_nbr_elvs, LevelStatData[lid].nbr_classes)

                                return <tr className=" 2xl:h-16 h-14 border-b border-black  hover:bg-slate-200 " key={index}>

                                    <td className="pl-6  pr-3  font-medium text-gray-900 whitespace-nowrap ">
                                        {school.name}
                                    </td>
                                    <td className=" pl-6 pr-10 py-4 ">
                                        {LevelStatData[lid].nbr_st}
                                    </td>
                                    <td className=" pr-5 px-6 py-4 ">
                                        {LevelStatData[lid].nbr_leaving}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {LevelStatData[lid].nbr_comming}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {current_nbr_elvs}
                                    </td>
                                    <td className=" pr-5 px-6 py-4">
                                        {LevelStatData[lid].nbr_classes}
                                    </td>
                                    <td className="">
                                        <Kethefa_TableCell number={Number(nbr_kethefa)} />
                                    </td>
                                    <td className="pr-5 px-6 py-4 text-left">
                                        <Hemich_TableCell number={zyeda_no9san} />
                                    </td>
                                    {is_admin && <td className="pr-5 px-6 py-4 flex  justify-end">
                                        <button className="font-medium text-blue-600  hover:underline pl-5">
                                            <Link to={'edit/' + sid}>
                                                تحيين
                                            </Link>
                                        </button>
                                    </td>}


                                </tr>

                            })}

                        </tbody>
                    </table>
                </div>


            </div >

        </>
    )
}




export default LevelComp;