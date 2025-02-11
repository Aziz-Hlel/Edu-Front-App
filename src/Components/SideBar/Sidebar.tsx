import { ChevronLast, ChevronFirst } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { pages } from "../../App";
import { SidebarItem } from "./SidebarItem";
import { useLocation } from "react-router-dom";
import  blackk  from "../../img/blackk.png"

export default function Sidebar() {

    const [expanded, setExpanded] = useState(false);
    const [active, set_active] = useState(0);
    const set_active_funct = (index: number) => {
        set_active(index)
    }

    const location = useLocation();


    useLayoutEffect(() => {

        pages.map((page, index) => {
            location.pathname.startsWith(page.path) && set_active(index)
        })
    }, [])

    return (
        <div className=" bg-transparent shadow-xl shadow-transparent   ">


            <aside className="  h-screen w-fit top-0 z-40 " dir="rtl">
                <nav className="h-full flex flex-col bg-white border-l w-fit ">
                    <div className="2xl:p-4 p-2 xxl:pb-6 xxl:pr-10 flex justify-between items-center ">
                        <img
                            src={blackk}
                            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
                            alt=""
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronLast /> : <ChevronFirst />}
                        </button>
                    </div>

                    <ul className="flex-1 px-3 ">

                        {pages.map((page, index) => {
                            return (
                                <div key={index}>

                                    <SidebarItem page={page} active={active !== index ? false : true} expanded={expanded} index={index} set_active_funct={set_active_funct} />
                                    {(index === 1 || index === 7 || index === 8 || index === 10) && <hr />}

                                </div>
                            )
                        })}

                    </ul>


                </nav>
            </aside>
        </div>
    )
}



