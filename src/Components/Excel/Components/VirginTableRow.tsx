import { useAuth } from "../../../useContext/AuthContext";





const VirginTableRow = () => {

    const { isAdmin } = useAuth();


    return (

        <tr className=" bg-slate-200 hover:bg-slate-400 border-b border-slate-500  2xl:h-16 h-14 "  >
            <td className="border-x border-slate-500 align-middle  text-xs  w-12">
            </td>

            <td className="border-x border-slate-500  text-center align-middle text-xs  w-12">
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 ">
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 cursor-default " >
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 ">
            </td>

            <td className="border-x border-slate-500  text-center align-middle text-xs  w-20">
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-16 ">
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 ">
            </td>

            <td className="border-x border-slate-500  text-center align-middle text-xs  w-40">
            </td>

            <td className=" border-x border-slate-500  text-center align-middle  text-xs  w-40 ">
            </td>

            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-40 ">

            </td>
            {isAdmin && <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 ">
            </td>}
            <td className="border-x border-slate-500  text-center align-middle  text-xs  w-32 ">
            </td>

        </tr>
    )
}





export default VirginTableRow;