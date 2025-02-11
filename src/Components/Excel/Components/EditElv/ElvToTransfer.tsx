import { useEffect, useState } from "react"
import getUrl from "../../../../useContext/getUrl";
import { handle_focus } from "../../functions/handle_focus";
import "../../../../index.css";
import Thead from "./components/Thead";
import useCityDataContext from "../../../../useContext/CityDataContext";
import CapacityWarning from "./components/CapacityWarning";
import useTransferredElvsContext from "../../../../useContext/TransferredElvsContext";
import useAxios from "../../../../hooks/useAxios";
import PrevEcoleCom from "./components/PrevEcoleCom";
import Del1Com from "./components/Del1Com";
import NextEcoleCom from "./components/NextEcoleCom";
import ReasonCom from "./components/ReasonCom";
import DecisionCom from "./components/DecisionCom";
import { dialogFillAllFields } from "../../../../lib/alertMessage";
import { useAuth } from "../../../../useContext/AuthContext";
import { SvgComponent } from "../../../../lib/Svgs";
import LoadingIcon from "../../../../lib/LoadingIcon";



export const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]
export const prev_ecole_sugg: { [key: string]: string } = {
    "-2": "مدرسة خاصة",
    "-3": "خارج الولاية",
    "-4": "خارج الوطن",
}



export const Ecoles_scrollbar = ` [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full overflow-y-scroll  
[&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-gray-600 `

const TableTitles = [

    "التلميذ(ة)",
    "المعرف الوحيد",
    "اسم الأب",
    "تاريخ الولادة",
    "مستوى",
    "المدرسة المرسم بها",
    "المعتمديّة",
    "المدرسة المرغوب فيها",
    "المؤيدات",
    "قرار اللجنة",
    "ملاحظات",
    "تسجيل"
];

export type warningProp = {
    kethefa: number;
    name: string;
    sid: number;
    level: number;
    is_comming: boolean;
}


const ElvToTransfer = () => {

    const { addElv, eleve, change_elv, IsSubmitting } = useTransferredElvsContext();
    const axios = useAxios();
    const { isAdmin } = useAuth();
    const { Del1Data, EcolesData } = useCityDataContext();

    const [warning_elv_kethefa, set_warning_elv_kethefa] = useState<warningProp | null>(null)

    const check_nbr_elv_post_transfer = async (is_comming: boolean) => {
        const url = getUrl();

        const elevee = {
            "sid": is_comming ? String(eleve.next_ecole_id) : String(eleve.prev_ecole_id),
            "level": eleve.level,
            "is_comming": is_comming
        }

        const reponse = await axios.post(url + "excel/check_nbr_elv_post_transfer/", elevee).then(response => {
            // Handle success response
            const axios_response: warningProp = (response as any).data
            if ((response as any).data === 'null') return null

            return axios_response;

        })
        return reponse;
    }

    // useEffect(() => {

    //     if (Number(eleve.level) && eleve.prev_ecole_id !== 0) {
    //         console.log('t5l prev')
    //         check_nbr_elv_post_transfer(false)

    //     }


    // }, [eleve.level, eleve.prev_ecole_id])


    useEffect(() => {

        const ww = async () => {
            const reponse = await check_nbr_elv_post_transfer(true);

            set_warning_elv_kethefa(reponse)


        }

        if (isAdmin && Number(eleve.level) && eleve.next_ecole_id !== 0) {
            ww();

        }

    }, [eleve.level, eleve.next_ecole_id])



    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'level') {
            if (value === "" || (Number(value) >= 1 && Number(value) <= 6)) {
                change_elv((prev) => {
                    return {
                        ...prev,
                        level: value
                    }
                })
            }
            return
        }

        change_elv((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }




    const handle_Enter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        if (event.key !== "Enter") return

        event.preventDefault();

        const number = Number(value)
        if (number <= 0) return

        if (name === 'level') {

            if (Number(value) <= 6) {
                change_elv((prev) => {
                    return {
                        ...prev,
                        [name]: value
                    }
                })
            }

            handle_focus(name);
            return
        }
        if (name === 'Del1') {
            if (Number(value) <= Object.keys(Del1Data).length) {
                const [del1_id, del_name] = Object.entries(Del1Data)[Number(value) - 1]
                await change_elv((prev) => {
                    return {
                        ...prev,
                        [name]: del_name,
                        ['Del1_id']: Number(del1_id)
                    }
                })
            }

            handle_focus(name);
            return
        }
        if (name === 'next_ecole') {
            if (eleve.Del1_id !== 0 && Number(value) <= Object.keys(EcolesData[eleve.Del1_id]).length) {

                const [sid, school] = Object.entries(EcolesData[eleve.Del1_id]).sort((a, b) => a[1].name.localeCompare(b[1].name))[Number(value) - 1]

                change_elv((prev) => {
                    return {
                        ...prev,
                        next_ecole: school.name,
                        next_ecole_id: Number(sid)
                    }
                })

            }

            handle_focus(name);
            return
        }

        if (name === 'reason') {
            if (Number(value) <= 5) {
                change_elv((prev) => {
                    return {
                        ...prev,
                        [name]: reasons[Number(value) - 1]
                    }
                })

            }

            handle_focus(name);
            return

        }

        if (name === 'comments') {
            handle_focus(name);
            return
        }

        if (name === 'nom_prenom') {
            handle_focus(name);
            return
        }
        if (name === 'nom_pere') {
            handle_focus(name);
            return
        }
        if (name === 'date_naissance') {
            handle_focus(name);
            return
        }
        if (name === 'prev_ecole') {
            if (Number(value) <= Object.keys(prev_ecole_sugg).length) {
                const prev_ecole_id = (Number(value) * -1) - 1;
                const prev_ecole = prev_ecole_sugg[prev_ecole_id.toString()]
                change_elv((prev) => {
                    return {
                        ...prev,
                        prev_ecole: prev_ecole,
                        prev_ecole_id: prev_ecole_id,
                    }
                })
            }
            handle_focus(name);
            return
        }

    }


    const close_warning_component = async () => {

        set_warning_elv_kethefa(null)
    }



    const verif_addElv = async () => {
        if (eleve.name === "" || eleve.prev_ecole_id === 0 || eleve.next_ecole_id === 0 || eleve.level === "" || eleve.decision === "") {
            dialogFillAllFields(`معطيات ناقصة`, 'الرجاء اكمال تعمير جميع الخانات', "warning")
            return
        };
        set_warning_elv_kethefa(null);


        addElv(eleve); // Perform async operation
        // Delay the next step by 0 milliseconds, allowing the state to update

    }



    return (
        <>
            <div className=" w-full h-fit flex flex-col items-center   z-40 ">

                <div className=" w-11/12  flex justify-center items-center  rounded-xl  ">

                    <div className="w-11/12 flex flex-col items-center  border border-gray-600 rounded-xl">
                        <table className="divide-y divide-gray-600 w-full ">

                            <thead className=" ">
                                <tr className=" select-none  ">
                                    {TableTitles.map((tabletitle, index) => {
                                        let className = "";
                                        if (index === 0) className += "rounded-tr-xl";
                                        if (index === TableTitles.length - 1) className += "border-l-0 rounded-tl-xl";
                                        if (tabletitle == "قرار اللجنة" && !isAdmin) return null
                                        return (<Thead key={index} title={tabletitle} className={className} />)
                                    })}
                                </tr>
                            </thead>


                            <tbody>

                                <tr className="  2xl:text-sm text-xs ">


                                    {/* التلميذ(ة) cell */}
                                    <td className="border-l border-gray-600 ">
                                        <input className="w-full 2xl:h-16 h-14   pr-1 text-center focus:outline-none   rounded-br-xl"
                                            name={"nom_prenom"} value={eleve.name} onChange={handle_change} onKeyUpCapture={handle_Enter} autoComplete="off"
                                        />
                                    </td>


                                    {/* المعرف الوحيد	 */}
                                    <td className="border-l border-gray-600 text-center bg-white w-28 ">
                                        {eleve.id !== 0 ? eleve.id : null}
                                    </td>


                                    {/* اسم الأب */}
                                    <td className="border-l border-gray-600 bg-white w-1/12 ">
                                        <input autoComplete="off" className="w-full text-xs 2xl:h-16 h-14  pr-1 text-center focus:outline-none " name="nom_pere" value={eleve.fatherName} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>


                                    {/* تاريخ الولادة */}
                                    <td className="border-l border-gray-600 bg-white w-20 ">
                                        <input autoComplete="off" className="w-full 2xl:h-16 h-14  pr-1 text-center focus:outline-none" name="date_naissance" value={eleve.dob ? String(eleve.dob) : ""} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>


                                    {/* مستوى */}
                                    <td className="border-l border-gray-600 bg-white">
                                        <input autoComplete="off" className="w-14 2xl:h-16 h-14  pr-1 text-center focus:outline-none" name="level" value={eleve.level} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>


                                    {/* المدرسة المرسم بها */}
                                    <PrevEcoleCom />


                                    {/* المعتمديّة */}
                                    <Del1Com />


                                    {/* المدرسة المرغوب فيها	 */}
                                    <NextEcoleCom />


                                    {/* المؤيدات */}
                                    <ReasonCom />


                                    {/* قرار اللجنة	 */}
                                    {isAdmin && <DecisionCom />}


                                    {/* ملاحظات	 */}
                                    <td className="border-l border-gray-600 bg-white w-16 2xl:w-auto">
                                        <input autoComplete="off" className="2xl:h-16 h-14 w-20 pr-1 focus:outline-none" name="comments" value={eleve.comments} onChange={handle_change} onKeyUpCapture={handle_Enter} />
                                    </td>


                                    {/* تسجيل */}
                                    <td className="  bg-white rounded-bl-xl w-14">
                                        <div className=" flex w-full justify-center">

                                            <button className="flex items-center justify-center w-fit  rounded-lg focus:border-2 focus:border-slate-800  " disabled={IsSubmitting}
                                                onClick={verif_addElv} id="Submit">
                                                {!IsSubmitting ? <SvgComponent /> : <LoadingIcon className=" w-6 h-6" />}
                                            </button>

                                        </div>
                                    </td>



                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Warning if elvs to transfer will excced the capacity of the new school */}
                <div className="h-14  flex justify-center mt-4">

                    {warning_elv_kethefa && <CapacityWarning warning_msg={warning_elv_kethefa} close_warning_component={close_warning_component} />}

                </div>

            </div >
            {/* <div className="h-24" /> */}
        </>
    )
}


export default ElvToTransfer;

