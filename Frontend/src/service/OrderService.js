import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const latestOrders = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/orders/latest`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const creatOrder = async (order) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/orders`, order, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const deleteOrder = async (orderId) => {
    return await axios.delete(`${API_BASE_URL}/api/v1.0/orders/${orderId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};