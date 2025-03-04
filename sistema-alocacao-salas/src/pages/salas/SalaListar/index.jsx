import { useEffect, useState } from 'react';
import { Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CardContent, Card, TableContainer, Paper} from '@mui/material'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from "react-router-dom";
import SalaService from '../../../services/salaService'; 

function SalasListar() {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [openDialogExclusao, setOpenDialogExclusao] = useState(false); 
  const [openDialogEdicao, setOpenDialogEdicao] = useState(false);
  const [salaExclusao, setSalaExclusao] = useState(null); 
  const [salaAtual, setSalaAtual] = useState(null); 
  const [nomeSala, setNomeSala] = useState(""); 


  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.roles.some(role => role.descricao === "ROLE_ADMIN")) {
        navigate("/");
        return;
    }
    
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
  }, [navigate]); 

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
    <Container>
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Lista de Salas</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/salas/cadastrar')}
            >
              Cadastrar Sala
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%', boxShadow: 2, borderRadius: salas.length > 0 ? 2 : 0 , backgroundColor: '#fff' }}>
        {salas.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
          <Table sx={{ '& td, & th': { textAlign: 'center' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salas.map((sala) => (
                <TableRow key={sala.id}>
                  <TableCell>{sala.id}</TableCell>
                  <TableCell>{sala.nome}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(sala)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleConfirmarExclusao(sala)}
                      sx={{ marginLeft: '10px' }}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <Typography variant="body1" align="center">Nenhuma sala cadastrada.</Typography>
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
