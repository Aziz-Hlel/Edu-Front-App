import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import getUrl from "../../useContext/getUrl";
import { SchoolsDataProps } from "../../hooks/useSchoolsInfo";
import useSchoolsInfoContext from "../../useContext/SchoolsInfoContext";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { alertMessageWithLoading } from "../../lib/alertMessage";


const EditSchool = () => {

    const params = useParams();
    const sid = Number(params.sid);
    const { SchoolsData, refetch_SchoolsData } = useSchoolsInfoContext();
    const navigate = useNavigate();
    const axios = useAxios();

    const [school, set_school] = useState<SchoolsDataProps>({ del1_name: '', email: '', ministre_school_name: '', phone1: 0, phone2: 0, principal: '', sid: 0 })

    const [invalid_phone_msg, set_invalid_phone_msg] = useState(false);
    const [invalid_email_msg, set_invalid_email_msg] = useState(false);


    useEffect(() => {
        const school = SchoolsData.find(school => school.sid === sid);

        SchoolsData && school && set_school(school)
    }, [])



    const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        set_invalid_phone_msg(false)
        set_invalid_email_msg(false)

        set_school((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const isValidEmail = (email: string) => {
        // Regular expression to match a basic email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    const isEightDigits = (num: number | null) => {
        if (!num) return true
        const numStr = num.toString();
        return numStr.length === 8;
    }


    const send = () => {

        if (!isEightDigits(school.phone1) || !isEightDigits(school.phone2)) {
            set_invalid_phone_msg(true);
            return
        }
        if (!isValidEmail) {
            set_invalid_email_msg(true)
            return
        }

        const url = getUrl();

        navigate('/');

        const postLoadingFunc = async () => {

            Swal.showLoading(null);
            await axios.post(url + "retrieve/EditSchoolInfo/", school);
            await refetch_SchoolsData();
            alertMessageWithLoading('تمّ تغيير المعطيات بنجاح', "success", null)
        }

        alertMessageWithLoading("جار التحميل", undefined, postLoadingFunc)


    
    }


    return (

        <>
            {school && <div className=" absolute w-0 h-0 z-50 ">

                {/* Background */}
                <div className="fixed w-full h-full bg-gray-200 opacity-40" />

                {/* Modal */}
                <div className=" opacity-100  fixed  z-50 justify-center items-center w-full  h-full   ">
                    <div className="flex justify-center items-center  h-full  w-full  ">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg  border-2 border-gray-200  shadow-lg shadow-slate-300">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    تغيير معطيات المدرسة
                                </h3>
                                <Link className="  text-gray-400 rounded-lg p-2.5 hover:bg-gray-200 hover:text-black" to={'/'}>
                                    <svg className="w-3 h-3 stroke-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </Link>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">


                                    <>
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">اسم المدرسة</label>
                                            <input dir="rtl" type="text" value={school?.ministre_school_name} disabled={true}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                        </div>
                                    </>

                                    <>
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">المدير</label>
                                            <input dir="rtl" type="text" name="principal" value={school?.principal} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-blue-600 focus:border-blue-600 block w-full p-2.5" />
                                        </div>
                                    </>

                                    <>
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">البريد الالكتروني</label>
                                            <input dir="rtl" type="text" name="email" value={school?.email} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-blue-600 focus:border-blue-600 block w-full p-2.5" />
                                        </div>
                                    </>


                                    <>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">الهاتف الجوال 1</label>
                                            <input type="number" name="phone1" value={school.phone1 ?? 0} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-blue-600 focus:border-blue-600 block w-full p-2.5 no-spinner " />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">الهاتف الجوال 2</label>
                                            <input type="number" name="phone2" value={school.phone2 ?? 0} onChange={handle_change}
                                                className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-600 focus:border-primary-600 block w-full p-2.5 no-spinner " />
                                        </div>
                                    </>


                                    <>
                                        <div className="col-span-2 h-5 w-full text-red-500  text-sm">
                                            {invalid_email_msg && "الرجاء التثبت من البريد الالكتروني   "}
                                            {invalid_phone_msg && "الرجاء التثبت من الهاتف الجوال	   "}
                                        </div>
                                    </>


                                </div>


                                <button onClick={send}
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    <svg className=" text-white me-1 -ms-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                    تسجيل
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>}

        </>

    )
}


export default EditSchool;