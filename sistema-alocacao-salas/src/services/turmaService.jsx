import axios from 'axios';

const API_URL = 'http://localhost:8082/turmas-ms/turmas';

const TurmaService = {

  cadastrarTurma: async (turmaDTO) => {
    const response = await axios.post(API_URL, turmaDTO);
    return response.data;
  },

  listarTurmas: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  editarTurma: async (id, turmaDTO) => {
    const response = await axios.put(`${API_URL}/${id}`, turmaDTO);
    return response.data;
  },

  excluirTurma: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  listarTurmasPorProfessor: async (idProfessor) => {
    const response = await axios.get(`${API_URL}/professor/${idProfessor}`);
    return response.data;
  },

  buscarTurmasPorIds: async (ids) => {
    const response = await axios.post(`${API_URL}/buscar-turmas`, ids);
    return response.data;
  },
};

export default TurmaService;
