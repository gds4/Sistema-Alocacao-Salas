import React, { useState } from 'react'; 
import SalaService from '../../services/salaService'; 
import { toast } from 'react-toastify'; 
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const SalaCadastrar = () => {
  const [nome, setNome] = useState(''); 
  const [mensagemErro, setMensagemErro] = useState(''); 

  const showToastSuccess = () => {
    toast.success('Sala cadastrada com sucesso!', {
    });
  };

  const showToastError = () => {
    toast.error('Erro ao cadastrar a sala. Tente novamente!', {
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome) {
      setMensagemErro('A descrição da sala é obrigatória!');
      return;
    }

    const sala = {nome}; 

    try {
      await SalaService.cadastrarSala(sala);
      setNome(''); 
      setMensagemErro(''); 
      showToastSuccess(); 
    } catch (error) {
      showToastError(); 
    }
  };

  return (
  
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      width: '100%' 
    }}>
      <Container component="form" onSubmit={handleSubmit} maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Cadastrar Sala
        </Typography>
        
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
        
        <TextField
          label="Descrição da Sala"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ width: 'auto' }}>
          Cadastrar Sala
        </Button>
      </Container>
    </Box>
  
  
  );
};

export default SalaCadastrar;
