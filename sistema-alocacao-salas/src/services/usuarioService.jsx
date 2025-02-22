import axios from 'axios';

const API_URL = 'http://localhost:8082/usuarios-ms/usuarios';

const UsuarioService = {

  cadastrarUsuario: async (novoUsuario) => {
    const response = await axios.post(API_URL, novoUsuario);
    return response.data;
  },

  editarUsuario: async (id, usuarioAtualizado) => {
    const response = await axios.put(`${API_URL}/${id}`, usuarioAtualizado);
    return response.data;
  },

  removerUsuario: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  obterDadosUsuario: async (token) => {
    const response = await axios.get(`${API_URL}/dados-usuario`, {
      headers: { Authorization: token }
    });
    return response.data;
  },

  listarUsuariosComRoleProfessor: async () => {
    const response = await axios.get(`${API_URL}/professores`);
    return response.data;
  }
};

export default UsuarioService;
