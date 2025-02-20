import axios from 'axios';

const API_URL = 'http://localhost:8082/usuarios-ms';

const AuthService = {
  login: async (email, senha) => {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;
  },

  getCurrentUser: () => {
    return localStorage.getItem('token'); 
  }
};

export default AuthService;