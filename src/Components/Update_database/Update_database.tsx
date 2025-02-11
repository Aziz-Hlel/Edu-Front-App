import { useEffect, useState } from "react";
import getUrl from "../../useContext/getUrl";



const Update_database = () => {

    const [msgreussie, set_reussie] = useState(false);
    // const [msgerreur, set_msgerreur] = useState(false);

    const [Enable_buttons, set_buttons] = useState(true);
    const [_, setFileData] = useState<Blob | null>(null);



    const [isLoading, setIsLoading] = useState(false);  // ~
    const url = getUrl();
    const [imageData, set_image] = useState<string>();

    // const [code, set_code] = useState("");
    // const [error_IsNaN, set_error_IsNaN] = useState(false)
    const [error_code, set_error_code] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            console.log(`File name: ${file.name}`);
            console.log(`File size: ${file.size} bytes`);
            console.log(`File type: ${file.type}`);

            // Store the file directly in the state as a Blob
            setFileData(file);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + "x/GetCapatcha/");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                set_image(jsonData.image_data);
            } catch (error: unknown) {
            }
        };
        const orginizer = async () => {
            await fetchData();
            setIsLoading(false)
        }
        orginizer()
    }, [])
    useEffect(() => {
        if (imageData)
            displayImage(imageData)
    }, [imageData])
    function displayImage(base64ImageData: string) {
        const imageElement = document.getElementById('imageElement') as HTMLImageElement;
        // Set the source of the image element with the base64 data
        imageElement.src = `data:image/jpeg;base64,${base64ImageData}`;
    }
    // const handle_input_id = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     const { value } = event.target as HTMLInputElement;
    //     if (!isNaN(Number(value))) {
    //         set_error_IsNaN(false)
    //         set_error_code(false)
    //         set_code(value)
    //     }
    //     else {
    //         set_error_IsNaN(true)
    //     }
    // }
    const handle_click = async () => {
        const SendCode = async () => {
            try {
                const response = await fetch(url + "x/VerifyCapatcha/" + 'code');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                if (!jsonData) {
                    set_error_code(true)
                    set_reussie(false)
                }
                else {
                    set_error_code(false)
                    set_reussie(true)
                }
            } catch (error: unknown) {
            }
        };
        set_error_code(false)
        set_buttons(false)
        await SendCode();
        set_buttons(true)

        // go_to_main()
    }
    if (isLoading) {
        return <Loading />
    }


    return (
        <>
            <div className='absolute w-full h-full  bg-slate-300 flex justify-center items-center ' dir='rtl'>
                <div className=" px-4 py-10  mx-auto w-4/12 h-4/5  ">
                    <div className="bg-white  rounded-xl shadow h-full flex flex-col items-center  shadow-gray-400 p-20 ">
                        <div className='bg-slate-50 shadow-md pb-3 px-4 border border-blue-300 rounded-lg focus-within:border-blue-500 mb-9 w-full'>
                            <div className="items-center border-b focus-within:border-blue-500 py-2 ">
                                <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="اسم المستعمل" name="nom" />
                            </div>
                        </div>
                        <div className='bg-slate-50 shadow-md pb-3 px-4 border border-blue-300 rounded-lg focus-within:border-blue-500 mb-9  w-full'>
                            <div className="items-center border-b focus-within:border-blue-500 py-2 ">
                                <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="كلمة السرّ" name="mdp" />
                            </div>
                        </div>
                        <div className='flex w-full  justify-start items-center jusc'>
                            <div className='bg-slate-50 shadow-md pb-3 px-4 border border-blue-300 rounded-lg focus-within:border-blue-500 mb-9  w-1/2'>
                                <div className="items-center border-b focus-within:border-blue-500 py-2 ">
                                    <input autoComplete="off" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="الرمز" name="code" />
                                </div>
                            </div>
                            {imageData && <img className="  pr-5 pb-10" id="imageElement" src="" alt="Image" />}
                        </div>
                        <div className=' flex  justify-center items-center w-full '>
                            <label className="block ml-6 font-medium text-gray-700">تحميل هرم الأقسام</label>
                            <div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                        Choose File
                                    </button>
                                </div>
                                {/* {fileName && <p className="mt-2">{fileName}</p>} */}
                            </div>
                        </div>
                        <div className='flex  mt-5 text-red-600 font-semibold h-20'>
                            <div>


                                {msgreussie && <span className=" text-green-600"> تم تحديث قاعدة بيانات سوسة بنجاح</span>}
                                {error_code && <span> البيانات  غير مطابقة للسّجلات</span>}
                            </div>
                        </div>
                        <div className=" flex w-full  justify-center  mt-10 h-20">
                            <button id="Submit" type="button" className="text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-600  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-60 h-14"
                                onClick={handle_click}        >
                                {!Enable_buttons ?
                                    <div className='ml-2 '>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                        </svg>
                                    </div>
                                    : "تحديث قاعدة البيانات"}
                            </button>
                        </div>
                    </div >
                </div >
            </div >

        </>
    )
}

export default Update_database



const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="mb-4 w-32 h-32 w border-t-4 border-blue-500 rounded-full animate-spin">
                </div>
                <div>
                    Loading
                </div>
            </div>
        </>
    )
}