import axios from 'axios';

const API_URL = 'http://localhost:8082/turmas-ms/disciplinas';

const DisciplinaService = {

  cadastrarDisciplina: async (novaDisciplina) => {
    const response = await axios.post(API_URL, novaDisciplina);
    return response.data;
  },

  listarDisciplinas: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  editarDisciplina: async (id, disciplinaAtualizada) => {
    const response = await axios.put(`${API_URL}/${id}`, disciplinaAtualizada);
    return response.data;
  },

  excluirDisciplina: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  listarDisciplinasPorProfessor: async (idProfessor) => {
    const response = await axios.get(`${API_URL}/professor/${idProfessor}`);
    return response.data;
  },

  listarTurmasPorDisciplina: async (idDisciplina) => {
    const response = await axios.get(`${API_URL}/${idDisciplina}/turmas`);
    return response.data;
  }
};

export default DisciplinaService;
