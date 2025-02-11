import Downshift from "downshift";
import { useEffect, useRef, useState } from "react";
import useCityDataContext from "../../../../../useContext/CityDataContext";
import useTransferredElvsContext from "../../../../../useContext/TransferredElvsContext";
import fuzzaldrin from "fuzzaldrin-plus";
import { handle_focus } from "../../../functions/handle_focus";
import { twMerge } from "tailwind-merge";





const Del1Com = () => {

    const { Del1Data } = useCityDataContext();

    const { eleve, change_elv } = useTransferredElvsContext();

    const downshiftRef = useRef<Downshift<any>>(null);


    const fuzzyFilter = (input: string) => {

        const dataArray = Object.entries(Del1Data).map(([id, value]) => ({
            id: Number(id),
            value,
        }));


        const options: fuzzaldrin.IFilterOptions<{ id: number; value: string }> = {
            key: 'value'
        };

        if (input === '') return dataArray
        return fuzzaldrin.filter(dataArray, input, options);
    }

    const openDownshiftMenu = () => {
        if (downshiftRef.current) {
            downshiftRef.current.setState({ isOpen: true });
        }
    };

    const [Del1, set_Del1] = useState("")

    useEffect(() => { set_Del1(eleve.Del1) }, [eleve.Del1])

    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_Del1(event.target.value)
    }


    const onblur = () => {
        set_Del1(eleve.Del1)
    }
    console.log(eleve.Del1_id)
    return (
        <td className="border-l border-gray-600 bg-white ">

            <div className=" h-full ">

                <Downshift ref={downshiftRef}

                    onSelect={selection => {
                        change_elv((prev) => {
                            return {
                                ...prev,
                                Del1: selection.value,
                                Del1_id: selection.id,
                                next_ecole: selection.id === prev.Del1_id ? prev.next_ecole : "",
                                next_ecole_id: selection.id === prev.Del1_id ? prev.next_ecole_id : 0,
                            }
                        })
                        handle_focus('Del1')

                    }}
                    itemToString={item => (item ? item.ministre_school_name : '')}
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
                            <input {...getInputProps()} onFocus={openDownshiftMenu} className="w-28 2xl:h-16 h-14 focus:outline-none pr-1 text-center " name="Del1" value={Del1} onChange={handle_input_change} onBlur={onblur} />

                            <ul {...getMenuProps()} className={twMerge("z-50 absolute text-xs  font-normal   overflow-hidden cursor-default bg-white shadow-md rounded-lg opacity-0 h-0 min-w-24 ", isOpen && "p-2 mt-1 opacity-100 h-fit animate-fade")}>
                                {isOpen && (
                                    <>
                                        {
                                            fuzzyFilter(Del1).map((item, index) => (
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



export default Del1Com;