import api from "../APIS/axiosApi/api";

const DISCIPLINA_ENDPOINT = '/turmas-ms/disciplinas';

const DisciplinaService = {

  cadastrarDisciplina: async (novaDisciplina) => {
    try {
      const response = await api.post(DISCIPLINA_ENDPOINT, novaDisciplina);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarDisciplinas: async () => {
    try {
      const response = await api.get(DISCIPLINA_ENDPOINT);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  editarDisciplina: async (id, disciplinaAtualizada) => {
    try {
      const response = await api.put(`${DISCIPLINA_ENDPOINT}/${id}`, disciplinaAtualizada);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  excluirDisciplina: async (id) => {
    try {
      const response = await api.delete(`${DISCIPLINA_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarDisciplinasPorProfessor: async (idProfessor) => {
    try {
      const response = await api.get(`${DISCIPLINA_ENDPOINT}/professor/${idProfessor}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarTurmasPorDisciplina: async (idDisciplina) => {
    try {
      const response = await api.get(`${DISCIPLINA_ENDPOINT}/${idDisciplina}/turmas`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  handleError: (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Erro na comunicação com o servidor';
    console.error('Erro na requisição:', errorMessage);
    throw new Error(errorMessage);
  }
};

export default DisciplinaService;
