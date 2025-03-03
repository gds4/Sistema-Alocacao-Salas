import { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress, Paper } from "@mui/material";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{

    function autenticar(){
      if(localStorage.getItem('token') != null) {navigate('/')};
    }autenticar();
   

  },[navigate])

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await AuthService.login(email, senha);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    }catch(error){
      toast.error('Login ou senha Inválidos')
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;