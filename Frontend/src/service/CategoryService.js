import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const addCategory = async (category) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/admin/categories`, category, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${API_BASE_URL}/api/v1.0/admin/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const fetchCategories = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/categories`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

