import { apiUrl } from "@/env";
import axios, { AxiosRequestConfig } from "axios";

const defaultPayloadConfig = {
    timeout: 60000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    baseURL: apiUrl
} as AxiosRequestConfig;

const payloadClient = axios.create(defaultPayloadConfig);

export default payloadClient;