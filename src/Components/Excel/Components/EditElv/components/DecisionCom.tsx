import Downshift from "downshift"
import { twMerge } from "tailwind-merge"
import { handle_focus } from "../../../functions/handle_focus"
import { Ecoles_scrollbar } from "../ElvToTransfer"
import { useEffect, useRef, useState } from "react"
import useSchoolsInfoContext from "../../../../../useContext/SchoolsInfoContext"
import useTransferredElvsContext from "../../../../../useContext/TransferredElvsContext"
import { SchoolsDataProps } from "../../../../../hooks/useSchoolsInfo"
import fuzzaldrin from "fuzzaldrin-plus"



const decisions: SchoolsDataProps[] = [
    { sid: 0, ministre_school_name: "مع الموافقة", principal: "", del1_name: "", email: "", phone1: null, phone2: null },
    { sid: 0, ministre_school_name: "استكمال الملف", principal: "", del1_name: "", email: "", phone1: null, phone2: null },
]


const DecisionCom = () => {

    const { eleve, change_elv } = useTransferredElvsContext();
    const { SchoolsData } = useSchoolsInfoContext();
    const [decision, set_decision] = useState("")


    const downshiftRef = useRef<Downshift<any>>(null);
    const openDownshiftMenu = () => {
        if (downshiftRef.current) {
            downshiftRef.current.setState({ isOpen: true });
        }
    };


    const fuzzyFilter = (input: string) => {
        const options: fuzzaldrin.IFilterOptions<SchoolsDataProps> = {
            key: 'ministre_school_name',
        };

        if (input === "") return decisions

        const PublicSchoolData = SchoolsData.filter((ecole) => {
            const sidString = ecole.sid.toString();
            return !(sidString[2] === '9' && sidString[3] === '8');
        });

        return fuzzaldrin.filter([...PublicSchoolData, ...decisions], input, options)
    }


    const onblur = () => {
        set_decision(eleve.decision)
    }

    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_decision(event.target.value)
    }


    useEffect(() => { set_decision(eleve.decision) }, [eleve.decision])


    return (

        <td className="border-l border-gray-600 bg-white ">
            <div className=" h-full ">

                <Downshift ref={downshiftRef}


                    onSelect={selection => {
                        change_elv((prev) => {
                            return {
                                ...prev,
                                decision: selection.ministre_school_name,
                                decision_id: selection.sid
                            }
                        })
                        handle_focus('decision')

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
                            <input {...getInputProps()} onBlur={onblur} onFocus={openDownshiftMenu} className="w-24 2xl:h-16 h-14 focus:outline-none pr-1 text-center" name="decision" value={decision} onChange={handle_input_change} />

                            <ul {...getMenuProps()} className={twMerge("z-50 absolute text-xs  font-normal  max-h-32 overflow-hidden cursor-default bg-white shadow-md rounded-lg opacity-0 h-0 ", Ecoles_scrollbar, isOpen && "p-2 mt-1 opacity-100 h-fit animate-fade")}>
                                {isOpen && (
                                    <>
                                        {
                                            fuzzyFilter(decision).map((item, index) => (
                                                <li className={twMerge("hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md", highlightedIndex === index && 'bg-blue-300',
                                                    selectedItem === item && 'font-bold',)}
                                                    {...getItemProps({
                                                        key: index,
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


export default DecisionCom;