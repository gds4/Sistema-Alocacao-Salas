import api from "../APIS/axiosApi/api";


const AULA_ENDPOINT = '/aulas-ms/aulas';

const AulaService = {
  agendarAula: async (novaAula) => {

      const response = await api.post(AULA_ENDPOINT, novaAula);
      return response.data;
   
  },

  editarAula: async (id, aulaAtualizada) => {
    try {
      const response = await api.put(`${AULA_ENDPOINT}/${id}`, aulaAtualizada);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  deletarAula: async (id) => {
    try {
      const response = await api.delete(`${AULA_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarTodasAulas: async () => {
    try {
      const response = await api.get(AULA_ENDPOINT);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarAulasPorSala: async (salaId) => {
    try {
      const response = await api.get(`${AULA_ENDPOINT}/sala/${salaId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  obterAula: async (id) => {
    try {
      const response = await api.get(`${AULA_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarAulasPorProfessor: async (professorId) => {
    try {
      const response = await api.get(`${AULA_ENDPOINT}/professor/${professorId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarAulasPorTurmas: async (turmaIds) => {
    try {
      const response = await api.post(`${AULA_ENDPOINT}/turmas`, turmaIds);
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

export default AulaService;