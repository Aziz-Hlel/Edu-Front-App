import { BrillantTransferEleveSearchProp } from "../SearchTransfers";






const TableRow = ({ eleve }: { eleve: BrillantTransferEleveSearchProp }) => {


    return (
        <>
            <tr className=' 2xl:h-14 h-11 hover:bg-slate-300'>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-sm w-fit text-center font-medium text-gray-800">{eleve.nom_prenom}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800">{eleve.uid}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800+">{eleve.level}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800 ">{eleve.prev_ecole}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800 ">{eleve.next_ecole}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800">{eleve.reason}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800 ">{eleve.date_downloaded !== null ? eleve.decision : ""}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800 ">{eleve.comments}</td>
                <td className="px-2 border-l cursor-default  2xl:py-1 text-xs w-fit text-center text-gray-800 ">{eleve.date_downloaded === null ? "لم يتم التحويل بعد" : eleve.date_downloaded}</td>
            </tr>
        </>
    )
}

export default TableRow;
