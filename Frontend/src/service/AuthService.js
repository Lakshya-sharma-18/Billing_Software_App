import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const login = async (data) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/login`, data);
};