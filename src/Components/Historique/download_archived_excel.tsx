import { AxiosInstance } from "axios";
import getUrl from "../../useContext/getUrl";







const download_archived_excel = async (date: string, axios: AxiosInstance) => {
    const url = getUrl();

    const response = await axios.get(url + "excel/CreateExcel/" + date, {
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
    return 1

}

export default download_archived_excel;
