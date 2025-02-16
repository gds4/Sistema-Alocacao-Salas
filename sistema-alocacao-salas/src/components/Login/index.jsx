import { useState } from "react";
import "./Login.css"
import AuthService from "../../services/authService";
import PropTypes from 'prop-types';

function Login({ onLogin }){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false)

  
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await AuthService.login(email, senha); // Chama o serviço
      localStorage.setItem('token', data.token);
      onLogin(); // Chama a função 'onLogin' passada pelo componente pai
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="container">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Digite seu email" name="email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="form-control" placeholder="Digite sua senha" name="senha" required />
        </div>
          <button className="btn btn-primary w-100 mb-3" type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Login'}
        </button>

      </form>
    </div>

  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;