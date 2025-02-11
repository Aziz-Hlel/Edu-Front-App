import { useState } from 'react';
import download_img from '../../../img/download.png';
import useTransferredElvsContext from '../../../useContext/TransferredElvsContext';
import getUrl from '../../../useContext/getUrl';
import DowloadCom from './DowloadCom';
import useAxios from '../../../hooks/useAxios';


const DownloadExcelCom = () => {

    const { setElvsTavleNull, } = useTransferredElvsContext();
    const [Dowloading, setDowloading] = useState(false);

    const axios = useAxios();

    const downloadexcel = async () => {
        const url = getUrl();
        const SendData = async () => {
            async function downloadExcelFile() {

                const response = await axios.get(url + "excel/CreateExcel/", {
                    responseType: 'blob' // This ensures we handle the response as binary
                })


                // Create a Blob from the response data
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                // Create a link element to trigger the download
                const link = document.createElement('a');
                const urlBlob = window.URL.createObjectURL(blob);

                // Set the href and download attributes of the link
                link.href = urlBlob;

                // Extract the filename from the headers if possible, or set a default name
                const contentDisposition = response.headers['content-disposition'];

                const today = new Date();
                const dateString = today.toLocaleDateString();  // e.g., "9/10/2024" (depending on locale)

                const file = "نقل جديدة " + dateString
                let fileName = file + '.xlsx'; // default filename

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                    if (fileNameMatch.length > 1) {
                        fileName = fileNameMatch[1];
                    }
                }

                link.download = fileName;
                document.body.appendChild(link);

                // Programmatically trigger the download
                link.click();

                // Clean up the URL and the link
                document.body.removeChild(link);
                window.URL.revokeObjectURL(urlBlob);
                setElvsTavleNull();


            }
            await downloadExcelFile()
        }

        setDowloading(true);
        await SendData();
        setDowloading(false);
    }
    return (
        <>
            <div className=" text-3xl font-bold">


                <button className="absolute hover:animate-bounce 2xl:top-20 2xl:left-20 top-10 left-14 hover:scale-125 transition-transform outline outline-1 border-black rounded-full  " id="Download" onClick={() => downloadexcel()}>
                    { //    <svg className="w-7 h-7 text-gray-800 dark:text-white  py-0.5 px-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                        //       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                        //   </svg>
                    }
                    <img src={download_img} className="2xl:w-7 2xl:h-7 w-6 h-6  text-gray-800 dark:text-white  py-0.5 px-1.5" />
                    <div></div>
                </button>

            </div>
            {Dowloading && <div className=' absolute top-0 right-0  flex  w-full h-full '>
                {Dowloading && <DowloadCom />}

            </div>}
        </>
    )
}


export default DownloadExcelCom;

