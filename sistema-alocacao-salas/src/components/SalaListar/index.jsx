import { useEffect, useState } from 'react';
import { Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from "react-router-dom";
import SalaService from '../../services/salaService'; 

const SalasListar = () => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [openDialogExclusao, setOpenDialogExclusao] = useState(false); 
  const [openDialogEdicao, setOpenDialogEdicao] = useState(false);
  const [salaExclusao, setSalaExclusao] = useState(null); 
  const [salaAtual, setSalaAtual] = useState(null); 
  const [nomeSala, setNomeSala] = useState(""); 


  useEffect(() => {
    
    const carregarSalas = async () => {
      try {
        const salasData = await SalaService.listarSalas();
        setSalas(salasData || []);
      } catch (error) {
        console.error("Erro ao carregar as salas", error);
        setSalas([]);
      }
    };

    carregarSalas();
  }, []); 

  const handleExcluir = async (id) => {
    try {
      await SalaService.removerSala(id); 
      setSalas(salas.filter(sala => sala.id !== id)); 
      setOpenDialogExclusao(false);
      toast.success('Sala excluída com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir a sala", error);
    }
  };

  const handleConfirmarExclusao = (sala) => {
    console.log(sala)
    setSalaExclusao(sala); 
    setOpenDialogExclusao(true); 
   
  };

  const handleEdit = (sala) => {
    setSalaAtual(sala);
    setNomeSala(sala.nome); 
    setNomeSala(sala.nome); 
    setOpenDialogEdicao(true);
  };

  const handleSave = async () => {
    try {
   
      await SalaService.atualizarSala(salaAtual.id, { nome: nomeSala });
      toast.success("Sala atualizada com sucesso!");
      setOpenDialogEdicao(false);
      setSalaAtual(null);
      setNomeSala(""); 
      
      const response = await SalaService.listarSalas();
      setSalas(response || []);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao atualizar sala.");
    }
  };

  const handleFecharDialogExclusao = () => {
    setOpenDialogExclusao(false); 
    setSalaExclusao(null); 
    setOpenDialogExclusao(false); 
    setSalaExclusao(null); 
  };

  const handleFecharDialogEdicao = () => {
    setOpenDialogEdicao(false); 
    setSalaAtual(null); 
    setNomeSala(""); 
    setOpenDialogEdicao(false); 
    setSalaAtual(null); 
    setNomeSala(""); 
  };

  return (
    <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ width: '80%', maxWidth: '1000px', boxShadow: 2, borderRadius: 2, padding: 2, backgroundColor: '#fff' }}>
      <Typography variant="h5" gutterBottom align="center">
        Listar Salas
      </Typography>
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/sala/cadastrar')} 
          style={{ marginBottom: '20px' }}
        >
          Cadastrar Sala
        </Button>
      {salas.length > 0 ? (
        <Table sx={{ marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salas.map((sala) => (
              <TableRow key={sala.id}>
                <TableCell>{sala.id}</TableCell>
                <TableCell>{sala.nome}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary"  onClick={() => handleEdit(sala)}>
                    Editar
                    
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleConfirmarExclusao(sala)}
                    style={{ marginLeft: '10px' }}
                  >
                    Excluir
                   
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1">Nenhuma sala cadastrada.</Typography>
      )}
    </Box>

    
     <Dialog open={openDialogExclusao} onClose={handleFecharDialogExclusao}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Deseja realmente excluir a sala <strong>{salaExclusao?.nome}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharDialogExclusao} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleExcluir(salaExclusao?.id)} 
            color="secondary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      
       <Dialog open={openDialogEdicao} onClose={handleFecharDialogEdicao}>
        <DialogTitle>Editar Sala</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome da Sala"
            type="text"
            fullWidth
            variant="outlined"
            value={nomeSala}
            onChange={(e) => setNomeSala(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharDialogEdicao} color="primary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
  </Container>
);
};

export default SalasListar;
