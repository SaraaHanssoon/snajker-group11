import axios from "axios"; // Använd ES-moduler istället för require

const API_URL = "http://localhost:5000/api/products"; // Se till att API-url matchar servern

const productService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data; // Axios returnerar ett objekt, vi vill bara ha datan
  },

  create: async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  },

  destroy: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  addReview: async (id, reviewData) => {
    const response = await axios.post(`${API_URL}/${id}/reviews`, reviewData);
    return response.data;
  }
};

export default productService; // Fixad export
