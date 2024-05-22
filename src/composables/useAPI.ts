import axios from 'axios';
import { useNotifications } from "@/composables/useNotifications";

export const useAPI = async (url: string, params?: any) => {

    const ECWID_API_URL = import.meta.env.VITE_ECWID_API_URL;
    const STORE_ID = import.meta.env.VITE_ECWID_STORE_ID;
    const ECWID_API_KEY = import.meta.env.VITE_ECWID_API_KEY;
    const API_ENDPOINT = `${ECWID_API_URL}${STORE_ID}`;

    const { showError } = useNotifications();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ECWID_API_KEY!,
    };

    try {
        const { data } = await axios.get(API_ENDPOINT + url, {
            headers,
            params,
        });
        return data;
    } catch (error) {
        showError({ error })
        return error;
    }
}
