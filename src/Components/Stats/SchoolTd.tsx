import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { SchoolsDataProps } from "../../hooks/useSchoolsInfo";





const SchoolTd = ({ schoolData, color, index }: { schoolData: SchoolsDataProps, color: string, index: number }) => {




    return (
        <>
            <tr className=" hover:bg-slate-400 " key={index}>
                <td className={twMerge(" pr-6 whitespace-nowrap text-sm text-gray-800 ", (color))}>{schoolData.del1_name}</td>
                <td className="pr-6 2xl:py-4 py-3 whitespace-nowrap 2xl:text-sm text-sm   text-gray-800 ">{schoolData.sid}</td>
                <td className="pr-6 2xl:py-4 py-3 whitespace-nowrap 2xl:text-sm text-sm  font-medium text-gray-800  ">
                    <Link to={'edit/' + schoolData.sid}>
                    <span className="hover:border-b hover:border-black ">
                        {schoolData.ministre_school_name}

                    </span>
                    </Link>
                </td>
                <td className="px-6 2xl:py-4 py-3 whitespace-nowrap 2xl:text-sm text-sm  text-gray-800 ">{schoolData.principal}</td>
                <td className="pr-6 2xl:py-4 py-3 whitespace-nowrap 2xl:text-sm text-sm  ">{schoolData.email}</td>
                <td className="pr-6 2xl:py-4 py-3 whitespace-nowrap 2xl:text-sm text-sm  ">
                    {schoolData.phone1}{schoolData.phone2 && '  -   ' + schoolData.phone2}
                </td>
               
            </tr>
        </>
    )
}

export default SchoolTd;
