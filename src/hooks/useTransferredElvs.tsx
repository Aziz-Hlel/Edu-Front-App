import getUrl from "../useContext/getUrl";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import { Eleve } from "../Components/Excel/Excel";
import { cancel_elv_db, transfer_elv_db } from "../Components/Excel/functions/cancel_elv_db";
import { handle_focus } from "../Components/Excel/functions/handle_focus";
import useCityDataContext from "../useContext/CityDataContext";
import useAxios from "./useAxios";
import { alertMessage, alertMessageWithLoading } from "../lib/alertMessage";
import { useAuth } from "../useContext/AuthContext";
import Swal from "sweetalert2";



interface ExcelRowsResponse {
    data: Eleve[];
    length: number;
}

const useTransferredElvs = () => {

    const axios = useAxios();
    const { isAdmin } = useAuth();
    const empty_elv: Eleve = { name: '', fatherName: '', dob: '', Del1: '', Del1_id: 0, prev_ecole: '', prev_ecole_id: 0, next_ecole_id: 0, level: '', id: 0, reason: '', decision_id: !isAdmin ? -1 : 0, decision: !isAdmin ? "   " : "مع الموافقة", comments: '', next_ecole: '' }

    const [eleves, set_eleves] = useState<Eleve[]>([]);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [pageNumber, setpageNumber] = useState(1);
    const [loadingfetchingRows, set_loadingfetchingRows] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const [eleve, set_eleve] = useState<Eleve>(empty_elv)
    const [IsSubmitting, setIsSubmitting] = useState(false)

    const { refetchLevelStat } = useCityDataContext()

    const fetchElvsRows = async (page: number): Promise<[Eleve[], number]> => {
        const url = getUrl();

        try {
            const response = await axios.get<ExcelRowsResponse>(url + 'excel/Getexcelrows/' + page);
            const rows = response.data.data;
            const len = response.data.length;
            return [rows, len];
        } catch (_) {
            return [[], 0];
        }
    };

    useEffect(() => {

        const fetch_elvs = async () => {
            const [data, rowsnumber] = await fetchElvsRows(0);
            console.log(data, rowsnumber)
            set_eleves(data)
            setRowsNumber(rowsnumber)

        };
        fetch_elvs();
    }, [])



    const addRows = async () => {
        const [data, _] = await fetchElvsRows(pageNumber)
        set_eleves((prev) => [...prev, ...data])
        setpageNumber(prev => prev + 1)
    }


    const delRow = async (index: number, eleve: Eleve) => {
        Swal.fire({
            title: `  هل تريد حذف التلميذ "${eleve.name}" ؟`,
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
            confirmButtonColor: '#d92626',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await cancel_elv_db(eleve, axios); // ~ zid condition ken rj3 false raou l database mouneka 
                if (response) {

                    const Newelvs = [...eleves];
                    Newelvs.splice(index, 1);
                    set_eleves(Newelvs);
                    refetchLevelStat()
                    setRowsNumber(prev => prev - 1)
                    alertMessage("تمّ حذف التلميذ", "success")
                }
            }
        })

    }


    const addElv = async (eleve: Eleve) => {

        const postLoadingFunc = async () => {
            Swal.showLoading();
            setIsSubmitting(true)

            const response = await transfer_elv_db(eleve, axios); // zid condition ken rj3 false raou l database mouneka

            if (response === true) {
                console.log('famech 8lta')
                refetchLevelStat()
                setRowsNumber(prev => prev + 1)
                set_eleves(prev_eleves => [eleve, ...prev_eleves])
                set_eleve(empty_elv)
                handle_focus("uid")
                alertMessageWithLoading('تمّ اضافة التلميذ بنجاح', "success", null)

            }
            setIsSubmitting(false)


        }

        alertMessageWithLoading("جار التحميل", undefined, postLoadingFunc)

    }


    const setElvsTavleNull = () => {
        set_eleves([])

    }


    const lastRowElemnt: LegacyRef<HTMLTableRowElement> = useCallback((node: any) => {
        console.log('ousil')
        if (loadingfetchingRows) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(async entries => {
            console.log('ousil houni zeda')
            if (entries[0].isIntersecting && eleves.length < rowsNumber) {
                set_loadingfetchingRows((prev) => !prev)
                console.log('ousil houni zeda')
                await addRows();
                set_loadingfetchingRows((prev) => !prev)

            }
        })
        if (node) observer.current.observe(node)
    }, [loadingfetchingRows,])


    const change_elv = (updater: (prev: Eleve) => Eleve) => {
        console.log(eleve)
        set_eleve(prev => updater(prev));
        console.log(eleve)
    };

    return { eleves, setElvsTavleNull, lastRowElemnt, rowsNumber, delRow, addElv, eleve, change_elv, IsSubmitting }
}


export default useTransferredElvs
