import Downshift from "downshift";
import useTransferredElvsContext from "../../../../../useContext/TransferredElvsContext";
import { handle_focus } from "../../../functions/handle_focus";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import fuzzaldrin from "fuzzaldrin-plus";



export const reasons = ["تغيير مقر الإقامة", "موافقة المدير", "نقلة عمل الولى", "له اخ بنفس المدرسة", "لديه أخت بالمدرسة",]



const ReasonCom = () => {

    const { eleve, change_elv } = useTransferredElvsContext();



    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {

        change_elv((prev) => {
            return {
                ...prev,
                reason: event.target.value
            }
        })

    }

    const fuzzyFilter = (input: string | undefined) => {

        if (input === "" || input == undefined) return reasons
        return fuzzaldrin.filter(reasons, input)
    }


    const downshiftRef = useRef<Downshift<any>>(null);

    const openDownshiftMenu = () => {
        if (downshiftRef.current) {
            downshiftRef.current.setState({ isOpen: true });
        }
    };


    const handle_Enter = async (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== "Enter") return
        event.preventDefault();
        handle_focus("reason")

    }

    return (

        <td className="border-l border-gray-600 bg-white ">

            <div className=" h-full ">

                <Downshift ref={downshiftRef}
                    itemToString={item => (item)}

                    onSelect={selection => {
                        change_elv((prev) => {
                            console.log(typeof (selection))
                            return {
                                ...prev,
                                reason: selection
                            }
                        })
                        handle_focus('reason')
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
                            <input {...getInputProps({ onFocus: openDownshiftMenu, className: "w-28 2xl:h-16 h-14 focus:outline-none pr-1 text-center", value: eleve.reason, onChange: handle_input_change, name: "reason", onKeyDown: handle_Enter })} />

                            <ul {...getMenuProps()} className={twMerge("z-50 absolute text-xs  font-normal   overflow-hidden cursor-default bg-white shadow-md rounded-lg opacity-0 h-0 min-w-24 ", isOpen && "p-2 mt-1 opacity-100 h-fit animate-fade")}>
                                {isOpen && (
                                    <>
                                        {
                                            fuzzyFilter(eleve.reason).map((item, index) => (
                                                <li className={twMerge("hover:bg-slate-300 pb-0.5 pr-1 pl-2 rounded-md", highlightedIndex === index && 'bg-blue-300',
                                                    selectedItem === item && 'font-bold',)}
                                                    {...getItemProps({
                                                        key: item,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                                                        }
                                                    })}
                                                >
                                                    {item}

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


export default ReasonCom;