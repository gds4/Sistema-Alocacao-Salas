import api from "../APIS/axiosApi/api";

const SALA_ENDPOINT = '/salas-ms/salas';

const SalaService = {
  cadastrarSala: async (salaDTO) => {
    try {
      const response = await api.post(SALA_ENDPOINT, salaDTO);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarSalas: async () => {
    try {
      const response = await api.get(SALA_ENDPOINT);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  atualizarSala: async (id, salaAtualizada) => {
    try {
      const response = await api.put(`${SALA_ENDPOINT}/${id}`, salaAtualizada);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  removerSala: async (id) => {
    try {
      const response = await api.delete(`${SALA_ENDPOINT}/${id}`);
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

export default SalaService;