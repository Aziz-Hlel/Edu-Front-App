import SchoolTd from "./SchoolTd";
import { twMerge } from "tailwind-merge";
import getScroolBar from "../../lib/ScrollBar";
import { useState } from "react";
import useSchoolsInfoContext from "../../useContext/SchoolsInfoContext";



const SchoolsTable = () => {
    const { SchoolsData } = useSchoolsInfoContext();

    const [search, set_serach] = useState('');

    const colors = ["bg-yellow-200", "bg-green-200", "bg-red-200", "bg-blue-200", "bg-orange-200", "bg-purple-200"]
    let current_del1 = "";
    let current_color_index = 0;
    return (
        <>
            <div className="flex flex-col 2xl:pt-12 pt-8 h-full overflow-hidden w-full">
                <div className="h-full">
                    <div className="px-1.5 pt-1.5 min-w-full inline-block align-middle h-full">
                        <div className="flex flex-col shadow-xl border rounded-lg bg-white h-full">

                            {/* SearchBar */}
                            <div className="2xl:py-3 py-2 px-4">
                                <div className="relative max-w-xs">
                                    <input
                                        type="text"
                                        className="py-2 px-3 ps-9 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                        placeholder="البحث عن مدرسة"
                                        onChange={(e) => { set_serach(e.target.value) }}
                                    />
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                        <svg
                                            className="w-5 h-5 text-gray-400 "
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className={twMerge("px-2 w-full overflow-y-scroll pr-5 h-full", getScroolBar())}>

                                <table className="w-full divide-y divide-gray-500 ">
                                    <thead className="bg-blue-600  sticky top-0">
                                        <tr>
                                            <th scope="col" className="w-40 px-6 py-3 text-start text-xs font-medium text-white uppercase ">المعتمديّة</th>
                                            <th scope="col" className="w-40 px-6 py-3 text-start text-xs font-medium text-white uppercase ">الرمز</th>
                                            <th scope="col" className="w-96 px-6 py-3 text-start text-xs font-medium text-white uppercase ">اسم المدرسة</th>
                                            <th scope="col" className="w-40 px-6 py-3 text-start text-xs font-medium text-white uppercase ">المدير</th>
                                            <th scope="col" className="w-96 px-6 py-3 text-start text-xs font-medium text-white uppercase ">البريد الالكتروني</th>
                                            <th scope="col" className="w-96 px-6 py-3 text-start text-xs font-medium text-white uppercase ">الهاتف الجوال</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-500  cursor-default">
                                        {SchoolsData && SchoolsData.filter((item) => {
                                            return search === '' ? item : (item.ministre_school_name.includes(search) || item.principal.includes(search))
                                        }).map((schoolData, index) => {
                                            if (current_del1 === "") current_del1 = schoolData.del1_name;

                                            if (current_del1 === schoolData.del1_name)
                                                return <SchoolTd key={schoolData.sid} schoolData={schoolData} color={colors[current_color_index]} index={index} />
                                            else {
                                                current_del1 = schoolData.del1_name
                                                current_color_index + 1 !== colors.length ? current_color_index += 1 : current_color_index = 0
                                                return <SchoolTd key={schoolData.sid} schoolData={schoolData} color={colors[current_color_index]} index={index} />
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SchoolsTable;
