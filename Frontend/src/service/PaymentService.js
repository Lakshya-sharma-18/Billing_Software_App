import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const creatRazorpayOrder = async (data) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/payment/create-order`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};

export const verifyPayment = async (paymentData) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/payment/verify`, paymentData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    });
};