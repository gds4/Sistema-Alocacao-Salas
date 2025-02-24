import api from "../APIS/axiosApi/api";

const USUARIO_ENDPOINT = '/usuarios-ms/usuarios';

const UsuarioService = {

  cadastrarUsuario: async (novoUsuario) => {
    try {
      const response = await api.post(USUARIO_ENDPOINT, novoUsuario);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  editarUsuario: async (id, usuarioAtualizado) => {
    try {
      const response = await api.put(`${USUARIO_ENDPOINT}/${id}`, usuarioAtualizado);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  removerUsuario: async (id) => {
    try {
      const response = await api.delete(`${USUARIO_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  obterDadosUsuario: async (token) => {
    try {
      const response = await api.get(`${USUARIO_ENDPOINT}/dados-usuario`, {
        headers: { Authorization: token }
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  listarUsuariosComRoleProfessor: async () => {
    try {
      const response = await api.get(`${USUARIO_ENDPOINT}/professores`);
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

export default UsuarioService;
