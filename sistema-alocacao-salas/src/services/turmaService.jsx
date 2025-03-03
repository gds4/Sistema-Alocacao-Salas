import api from "../APIS/axiosApi/api";
import { SemestreService } from "./semestreService";

const TURMA_ENDPOINT = '/turmas-ms/turmas';

const TurmaService = {

  cadastrarTurma: async (turmaDTO) => {
    try {
      const response = await api.post(TURMA_ENDPOINT, turmaDTO);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarTurmas: async () => {
    try {
      const response = await api.get(`${TURMA_ENDPOINT}?semestre=${SemestreService.semestreAtual}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  editarTurma: async (id, turmaDTO) => {
    try {
      const response = await api.put(`${TURMA_ENDPOINT}/${id}`, turmaDTO);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  excluirTurma: async (id) => {
    try {
      const response = await api.delete(`${TURMA_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarTurmasPorProfessor: async (idProfessor) => {
    try {
      const response = await api.get(`${TURMA_ENDPOINT}/professor/${idProfessor}?semestre=${SemestreService.semestreAtual}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  buscarTurmasPorIds: async (ids) => {
    try {
      const response = await api.post(`${TURMA_ENDPOINT}/buscar-turmas?semestre=2025.1`, ids);
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

export default TurmaService;
