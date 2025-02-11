import { AxiosInstance } from "axios";
import getUrl from "../../../useContext/getUrl";
import { Eleve } from "../Excel";
import { dialogFillAllFields } from "../../../lib/alertMessage";






export const transfer_elv_db = (eleve: Eleve, axios: AxiosInstance) => {

    const url = getUrl();

    const SendData = async () => {
        try {
            const response = await axios.post(url + "excel/transferElv/", eleve);

            const data = response.data;
            console.log(response.status)
            if ((data as any).response === true) return true
            return false

        } catch (error) {
            console.error(error);
            dialogFillAllFields('Erreur fatal', "Une erreur fatale s'est produite du côté serveur", 'error')
            return false
        }
    }

    return SendData();

}


export const cancel_elv_db = async (eleve: Eleve, axios: AxiosInstance) => {

    const url = getUrl();

    const SendData = async () => {
        try {
            const response = await axios.post(url + "excel/cancel_transferElv/", eleve);

            const data = response.data;
            return ((data as any).response as boolean);

        } catch (error) {
            dialogFillAllFields('Erreur fatal', "Une erreur fatale s'est produite du côté serveur", 'error')
            console.error(error);
            return false
        }
    }

    return await SendData();
}