import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const fetchDashboardData = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/dashboard`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

