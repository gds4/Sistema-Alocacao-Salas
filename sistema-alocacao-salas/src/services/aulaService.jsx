import axios from 'axios';

const API_URL = 'http://localhost:8082/aulas-ms/aulas';

const AulaService = {

  agendarAula: async (novaAula) => {
    const response = await axios.post(API_URL, novaAula);
    return response.data;
  },


  editarAula: async (id, novaAula) => {
    const response = await axios.put(`${API_URL}/${id}`, novaAula);
    return response.data;
  },


  deletarAula: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  listarTodasAulas: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  listarAulasPorSala: async (salaId) => {
    const response = await axios.get(`${API_URL}/sala/${salaId}`);
    return response.data;
  },

  obterAula: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  listarAulasPorProfessor: async (id) => {
    const response = await axios.get(`${API_URL}/professor/${id}`);
    return response.data;
  }
};

export default AulaService;
