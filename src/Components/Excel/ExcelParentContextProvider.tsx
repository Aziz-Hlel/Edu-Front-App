import Excel from "./Excel"
import { TransferredElvsContextProvider } from "../../useContext/TransferredElvsContext";




const ExcelParentContextProvider = () => {

    return (
        <>

            <TransferredElvsContextProvider>

                <Excel />

            </TransferredElvsContextProvider>
        </>
    )
}

export default ExcelParentContextProvider;
