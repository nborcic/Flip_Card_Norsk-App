import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch all items
export const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    } catch (err) {
        console.error('Error fetching items:', err);
        throw err;
    }
};

// Create a new item
export const createItem = async (item) => {
    try {
        const response = await axios.post(`${API_URL}/items`, item);
        return response.data;
    } catch (err) {
        console.error('Error creating item:', err);
        throw err;
    }
};

// Update an item by ID
export const updateItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/items/${id}`, updatedItem);
        return response.data;
    } catch (err) {
        console.error('Error updating item:', err);
        throw err;
    }
};

// Delete an item by ID
export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/items/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error deleting item:', err);
        throw err;
    }
};
