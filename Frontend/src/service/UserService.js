import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const addUser = async (user) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/admin/register`, user, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const deleteUser = async (userId) => {
    return axios.delete(`${API_BASE_URL}/api/v1.0/admin/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const fetchUsers = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/admin/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};