import Downshift from "downshift";
import useCityDataContext from "../../../../../useContext/CityDataContext";
import useTransferredElvsContext from "../../../../../useContext/TransferredElvsContext";
import { Ecoles_scrollbar } from "../ElvToTransfer";
import { handle_focus } from "../../../functions/handle_focus";
import { useEffect, useRef, useState } from "react";
import fuzzaldrin from "fuzzaldrin-plus";
import { twMerge } from "tailwind-merge";






const NextEcoleCom = () => {

    const { EcolesData } = useCityDataContext();
    const { eleve, change_elv } = useTransferredElvsContext();

    const downshiftRef = useRef<Downshift<any>>(null);

    const [next_ecole, set_next_ecole] = useState("")


    useEffect(() => { set_next_ecole(eleve.next_ecole) }, [eleve.next_ecole])

    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_next_ecole(event.target.value)
    }


    const onblur = () => {
        set_next_ecole(eleve.next_ecole)
    }

    const fuzzyFilter = (input: string) => {
        const dataArray = Object.entries(EcolesData[eleve.Del1_id]).map(([id, value]) => ({
            id: Number(id),
            value: value.name,
        }));

        const options: fuzzaldrin.IFilterOptions<{ id: number; value: string }> = {
            key: 'value'
        };
        if (input === "") return dataArray
        return fuzzaldrin.filter(dataArray, input, options)
    }

    const openDownshiftMenu = () => {
        if (downshiftRef.current) {
            downshiftRef.current.setState({ isOpen: true });
        }
    };
    return (
        <td className="border-l border-gray-600 bg-white ">

            <div className=" h-full ">

                <Downshift ref={downshiftRef}


                    onSelect={selection => {
                        change_elv((prev) => {
                            return {
                                ...prev,
                                next_ecole: selection.value,
                                next_ecole_id: selection.id,
                            }
                        })
                        handle_focus('next_ecole')

                    }}


                >
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        isOpen,
                        highlightedIndex,
                        selectedItem,
                    }) => (
                        <div className=" h-full">
                            <input {...getInputProps()} onBlur={onblur} onChange={handle_input_change} name="next_ecole" value={next_ecole} onFocus={openDownshiftMenu} className=" w-36 2xl:h-16 h-14 focus:outline-none pr-1 text-center" />

                            <ul {...getMenuProps()} className={twMerge("z-50 absolute text-xs  font-normal   overflow-hidden cursor-default bg-white shadow-md rounded-lg opacity-0 h-0 max-h-32 min-w-24", Ecoles_scrollbar, isOpen && eleve.Del1_id !== 0 && "p-2 mt-1 opacity-100 h-fit animate-fade")}>
                                {isOpen && eleve.Del1_id !== 0 && (
                                    <>
                                        {
                                            fuzzyFilter(next_ecole).map((item, index) => (
                                                <li className={twMerge("hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md", highlightedIndex === index && 'bg-blue-300',
                                                    selectedItem === item && 'font-bold',)}
                                                    {...getItemProps({
                                                        key: item.value,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                                                            fontWeight: selectedItem === item.value ? "bold" : "normal"
                                                        }
                                                    })}
                                                >
                                                    {item.value}

                                                </li>

                                            ))
                                        }
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </Downshift>
            </div>

        </td>
    )
}


export default NextEcoleCom;