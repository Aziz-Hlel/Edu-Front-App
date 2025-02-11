import Downshift from "downshift";
import useTransferredElvsContext from "../../../../../useContext/TransferredElvsContext";
import { useEffect, useRef } from "react";
import { handle_focus } from "../../../functions/handle_focus";
import { twMerge } from "tailwind-merge";
import fuzzaldrin from "fuzzaldrin-plus";
import { SchoolsDataProps } from "../../../../../hooks/useSchoolsInfo";
import { Ecoles_scrollbar, } from "../ElvToTransfer";
import useSchoolsInfoContext from "../../../../../useContext/SchoolsInfoContext";
import { useState } from "react"




const prev_ecole_sugg2: SchoolsDataProps[] = [
    { sid: -5, ministre_school_name: "*******", principal: "", del1_name: "", email: "", phone1: null, phone2: null },
    { sid: -2, ministre_school_name: "مدرسة خاصة", principal: "", del1_name: "", email: "", phone1: null, phone2: null },
    { sid: -3, ministre_school_name: "خارج الولاية", principal: "", del1_name: "", email: "", phone1: null, phone2: null },
    { sid: -4, ministre_school_name: "خارج الوطن", principal: "", del1_name: "", email: "", phone1: null, phone2: null }
]

const PrevEcoleCom = () => {

    const { eleve, change_elv } = useTransferredElvsContext();
    const { SchoolsData } = useSchoolsInfoContext();


    const downshiftRef = useRef<Downshift<any>>(null);


    const fuzzyFilter = (input: string) => {
        const options: fuzzaldrin.IFilterOptions<SchoolsDataProps> = {
            key: 'ministre_school_name',
        };

        if (input === "") return prev_ecole_sugg2
        const PublicSchoolData = SchoolsData.filter((ecole) => {
            const sidString = ecole.sid.toString();
            return !(sidString[2] === '9' && sidString[3] === '8');
        });

        return fuzzaldrin.filter([...PublicSchoolData, ...prev_ecole_sugg2], input, options)
    }

    const openDownshiftMenu = () => {
        if (downshiftRef.current) {
            downshiftRef.current.setState({ isOpen: true });
        }
    };

    const [prev_ecole, set_prev_ecole] = useState("")


    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_prev_ecole(event.target.value)
    }

    useEffect(() => { set_prev_ecole(eleve.prev_ecole) }, [eleve])

    const onblur = () => {
        set_prev_ecole((_) => eleve.prev_ecole)
    }

    return (

        <td className="border-l border-gray-600 bg-white ">
            <div className=" h-full ">

                <Downshift ref={downshiftRef}

                    onOuterClick={onblur}
                    onSelect={selection => {
                        change_elv((prev) => {
                            return {
                                ...prev,
                                prev_ecole: selection.ministre_school_name,
                                prev_ecole_id: selection.sid
                            }
                        })
                        handle_focus('prev_ecole')

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
                            <input {...getInputProps()} onBlur={onblur} onFocus={openDownshiftMenu} className="w-28 2xl:h-16 h-14 focus:outline-none pr-1 text-center" name="prev_ecole" value={prev_ecole} onChange={handle_input_change} />

                            <ul {...getMenuProps()} className={twMerge("z-50 absolute text-xs  font-normal  max-h-32 overflow-hidden cursor-default bg-white shadow-md rounded-lg opacity-0 h-0 min-w-24", Ecoles_scrollbar, isOpen && "p-2 mt-1 opacity-100 h-fit animate-fade")}>
                                {isOpen && (
                                    <>
                                        {
                                            fuzzyFilter(prev_ecole).map((item, index) => (
                                                <li className={twMerge("hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md", highlightedIndex === index && 'bg-blue-300',
                                                    selectedItem === item && 'font-bold',)}
                                                    {...getItemProps({
                                                        key: item.sid,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                                                            fontWeight: selectedItem === item.ministre_school_name ? "bold" : "normal"
                                                        }
                                                    })}
                                                >
                                                    {item.ministre_school_name}

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

export default PrevEcoleCom;





