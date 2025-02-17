import { useAuth } from "../../../../useContext/AuthContext";
import TableHead from "./TableHead";



const TableHeads = () => {

    const { isAdmin } = useAuth();


    return (
        <>
            <thead dir="rtl" className="sticky top-0 z-10  h-11    bg-blue-600 outline outline-1 outline-black -outline-offset-1 ">
                <tr className=" ">
                    <TableHead title={"     "} />
                    <TableHead title={"ع/ر"} />
                    <TableHead title={"التلميذ(ة)"} />
                    <TableHead title={"المعرف الوحيد"} />
                    <TableHead title={"اسم الأب"} />
                    <TableHead title={"تاريخ الولادة"} />
                    <TableHead title={"مستوى"} />
                    <TableHead title={"المدرسة المسجل بها ويرغب في مغادرتها"} />
                    <TableHead title={"المعتمديّة"} />
                    <TableHead title={"المدرسة المرغوب فيها"} />
                    <TableHead title={"المؤيدات"} />
                    {isAdmin && <TableHead title={"قرار اللجنة"} />}
                    <TableHead title={"ملاحظات"} />
                </tr>
            </thead>
        </>
    )
}


export default TableHeads;