import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contacts';

const contactService = {
    // Récupérer tous les contacts
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // Récupérer un contact par ID
    get: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // Créer un nouveau contact
    create: async (contactData) => {
        const response = await axios.post(API_URL, contactData);
        return response.data;
    },

    // Mettre à jour un contact
    update: async (id, contactData) => {
        const response = await axios.put(`${API_URL}/${id}`, contactData);
        return response.data;
    },

    // Supprimer un contact
    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
};

export default contactService;