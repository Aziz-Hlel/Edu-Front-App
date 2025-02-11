import { LegacyRef, createContext, useContext } from "react";
import { Eleve } from "../Components/Excel/Excel";
import useTransferredElvs from "../hooks/useTransferredElvs";


type TransferredElvsContextProps = {
    eleves: Eleve[];
    setElvsTavleNull: Function;
    lastRowElemnt: LegacyRef<HTMLTableRowElement>;
    rowsNumber: number;
    delRow: Function;
    addElv: Function;
    eleve: Eleve;
    change_elv: (updater: (prev: Eleve) => Eleve) => void;
    IsSubmitting: boolean;
}


const TransferredElvsContext = createContext<TransferredElvsContextProps | null>(null)



export const TransferredElvsContextProvider = ({ children }: { children: React.ReactNode }) => {


    const { eleves, setElvsTavleNull, lastRowElemnt, rowsNumber, delRow, addElv, eleve, change_elv, IsSubmitting } = useTransferredElvs();



    return (
        <>
            <TransferredElvsContext.Provider value={{ eleves, setElvsTavleNull, lastRowElemnt, rowsNumber, delRow, addElv, eleve, change_elv, IsSubmitting }}>
                {children}
            </TransferredElvsContext.Provider>
        </>
    )

}




export default function useTransferredElvsContext() {

    const context = useContext(TransferredElvsContext);

    if (!context) {
        throw new Error(
            "useTransferredElvsContext must be used in TransferredElvsContextProvider"
        )
    }

    return context;
}