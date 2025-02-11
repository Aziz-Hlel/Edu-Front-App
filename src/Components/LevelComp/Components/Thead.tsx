import { useAuth } from "../../../useContext/AuthContext";

const Thead = () => {

    const { isAdmin: is_admin } = useAuth();


    return (
        <>
            <thead className="sticky top-0 text-xs text-white bg-blue-600 bg 2xl:h-14 h-12 ">
                <tr className=" 2xl:text-sm text-xs font-medium">

                    <th scope="col" className="px-6    w-64">
                        المدرسة
                    </th>
                    <th scope="col" className="px-6  ">
                        التلاميذ بـ30أوت
                    </th>
                    <th scope="col" className="px-6 ">
                        مغادرون
                    </th>
                    <th scope="col" className="px-6 ">
                        وافدون
                    </th>
                    <th scope="col" className="px-6 ">
                        حاصل الحركة
                    </th>
                    <th scope="col" className="px-6 ">
                        عدد الفصول
                    </th>
                    <th scope="col" className="px-6 ">
                        الكثافة
                    </th>
                    <th scope="col" className="px-6 ">
                        الزيادة/النقصان
                    </th>
                    {is_admin && <th scope="col" className="px-6  text-left w-fit">
                        تحيين المعطيات
                    </th>}

                </tr>
            </thead>
        </>
    )
}

export default Thead
