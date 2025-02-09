import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';  // ✅ No extra slashes

export const fetchNodes = async () => {
    const response = await axios.get(`${API_BASE_URL}/nodes`);  // ✅ Removed extra "/"
    return response.data;
};

export const addNode = async (node) => {
    const response = await axios.post(`${API_BASE_URL}/nodes`, node);  // ✅ Removed extra "/"
    return response.data;
};

export const fetchElements = async () => {
    const response = await axios.get(`${API_BASE_URL}/elements`);  // ✅ Removed extra "/"
    return response.data;
};

export const addElement = async (element) => {
    const response = await axios.post(`${API_BASE_URL}/elements`, element);  // ✅ Removed extra "/"
    return response.data;
};
