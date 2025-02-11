import { twMerge } from "tailwind-merge";
import TableBody from "./TableBody";
import TableHeads from "./TableHeads";
import getScroolBar from "../../../../lib/ScrollBar";




const Table = () => {


    return (
        <>

            <div className={twMerge('h-full w-full ',getScroolBar())}>

                <table className="items-center  bg-transparent border  h-fit w-full pr-5 " dir="rtl">

                    <TableHeads />

                    <TableBody />

                </table>
            </div>


        </>
    )
}

export default Table;


