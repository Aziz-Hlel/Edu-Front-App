import { eleveSearchProp } from "../Search";


const TableRow = ({ eleve }: { eleve: eleveSearchProp }) => {


    return (
        <>
            <tr className=' 2xl:h-14 h-11'>
                <td className="px-6 2xl:py-4 py-2.5 text-sm font-medium text-gray-800">{eleve[1]}</td>
                <td className="px-6 2xl:py-4 py-2.5 text-sm text-gray-800">{eleve[0]}</td>
                <td className="px-6 2xl:py-4 py-2.5 text-sm text-gray-800 w-fit ">{eleve[2]}</td>
                <td className="px-6 2xl:py-4 py-2.5 text-sm text-gray-800">{eleve[3]}</td>
                <td className="px-6 2xl:py-4 py-2.5 text-sm text-gray-800 flex flex-grow w-full">{eleve[4]}</td>
            </tr>
        </>
    )
}

export default TableRow;
