import { useAuth } from "../../../../useContext/AuthContext";
import useTransferredElvsContext from "../../../../useContext/TransferredElvsContext";
import { Eleve } from "../../Excel";




const TableRow = ({ eleve, hash }: { eleve: Eleve, hash: number }) => {

    const { eleves, lastRowElemnt, rowsNumber, delRow, } = useTransferredElvsContext();

    const { isAdmin } = useAuth();
    if (eleves.length === hash + 1) {
        console.log(eleve)
    }
    return (
        // hash === 0 && "  animate-greenfade "
        <tr className={" bg-slate-50 hover:bg-slate-400 border-b border-black  2xl:h-16 h-14 "} id={String(hash)} ref={eleves.length !== hash + 1 ? undefined : lastRowElemnt} >
            <td className="border-x border-black align-middle  text-xs  w-12  justify-center">
                <div className="flex justify-center  " >
                    <div className="outline rounded-lg outline-1">
                        <button className="w-5 h-5 text-center text-white bg-red-500 rounded-lg hover:bg-red-700" tabIndex={hash} onClick={() => delRow(hash, eleve)}>X</button>
                    </div>
                </div>
            </td>

            <td className="border-x border-black  text-center align-middle text-xs  w-12">

                {rowsNumber - hash}
            </td>

            <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full ">

                {eleve.name}
            </td>

            <td className="border-x border-black  text-center align-middle  text-xs  w-32 cursor-default " >
                {"0" + eleve.id}
            </td>


            <td className="border-x border-black  text-center align-middle  text-xs  w-32 h-full">

                {eleve.fatherName}
            </td>

            <td className="border-x border-black  text-center align-middle text-xs  w-20 ">

                {eleve.dob}
            </td>

            <td className="border-x border-black  text-center align-middle text-xs w-16 ">

                {eleve.level}
            </td>

            <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">

                {eleve.prev_ecole}
            </td>

            <td className="border-x border-black  text-center align-middle text-xs  w-40">
                <div className="flex justify-center">

                    {eleve.Del1}

                </div>
            </td>

            <td className=" border-x border-black  text-center align-middle  text-xs  w-40 ">
                <div className="flex justify-center">

                    {eleve.next_ecole}

                </div>
            </td>

            <td className="border-x border-black  text-center align-middle  text-xs  w-40 ">
                <div className="flex justify-center">

                    {eleve.reason && eleve.reason}

                </div>
            </td>

            {isAdmin &&
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {eleve.decision}
                </td>}

            <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">

                {eleve.comments}
            </td>

        </tr >
    )
}


export default TableRow;