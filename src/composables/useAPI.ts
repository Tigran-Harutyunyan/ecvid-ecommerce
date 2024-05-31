import axios, { AxiosResponse } from 'axios';
/**
 * Asynchronous function that makes a GET request to the Ecwid API using Axios.
 * Constructs the API endpoint using environment variables and includes authorization headers.
 * @param url A string representing the endpoint to be appended to the base API URL.
 * @param params An optional object containing query parameters for the GET request.
 * @returns Data from the API response if the request is successful, otherwise the error object.
 */
export const useAPI = async (url: string, params?: any): Promise<any> => {
    const ECWID_API_URL: string = import.meta.env.VITE_ECWID_API_URL;
    const STORE_ID: string = import.meta.env.VITE_ECWID_STORE_ID;
    const ECWID_API_KEY: string = import.meta.env.VITE_ECWID_API_KEY;
    const API_ENDPOINT: string = `${ECWID_API_URL}${STORE_ID}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ECWID_API_KEY}`,
    };

    try {
        const response: AxiosResponse = await axios.get(API_ENDPOINT + url, {
            headers,
            params,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
