import useTransferredElvsContext from "../../../../useContext/TransferredElvsContext";
import VirginTableRow from "../VirginTableRow";
import TableRow from "./TableRow";




const TableBody = () => {

    const { eleves, } = useTransferredElvsContext();


    return (
        <>
            <tbody id="myTable" className=" bg-white">
                {eleves?.map((eleve, index) => {
                    {
                        return <TableRow key={index} eleve={eleve} hash={index} />
                    }
                })}

                {eleves.length <= 9 && (
                    <>
                        {Array.from({ length: 9 - eleves.length }).map((_, index2) => (
                            <VirginTableRow key={index2} />
                        ))}
                    </>
                )

                }

            </tbody>
        </>
    )
}




export default TableBody;