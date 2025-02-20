import axios from 'axios';

const API_URL = 'http://localhost:8082/salas-ms/salas';

const SalaService = {
  
  cadastrarSala: async (salaDTO) => {
    const response = await axios.post(API_URL, salaDTO);
    return response.data;
  },

  listarSalas: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },


  atualizarSala: async (id, salaDTO) => {
    const response = await axios.put(`${API_URL}/${id}`, salaDTO);
    return response.data;
  },


  removerSala: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default SalaService;
