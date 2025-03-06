import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  CardContent,
  Card
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../../services/aulaService";
import TurmaService from "../../../services/turmaService";
import SalaService from "../../../services/salaService";


function Aula() {
  const navigate = useNavigate();
  const [aulas, setAulas] = useState([]);
  const [turmas, setTurmas] = useState([])
  const [salas, setSalas] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.id) {
      toast.error('Ocorreu um erro ao buscar dados, Faça login novamente');
      return;
    }
    
    async function fetchAulas() {
      try {
        const isAdmin = usuario.roles.some(role => role.descricao === "ROLE_ADMIN");
        let response = isAdmin 
          ? await AulaService.listarTodasAulas()
          : await AulaService.listarAulasPorProfessor(usuario.id);
        
        setAulas(response);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar dados', error);
      }
    }
    
    fetchAulas();
  }, []);

  useEffect(() => {

    async function fetchTurmasPorAulas() {
      try {
        const turmasIds = aulas.map(aula => aula.turmaId)
        const response = await TurmaService.buscarTurmasPorIds(turmasIds);
        setTurmas(response)
      } catch (error) {
        console.error('Ocorreu um erro ao buscar dados', error)
      }

    } fetchTurmasPorAulas();
  }, [aulas])

  useEffect(() => {
    async function fetchSalas() {
      try {
        const response = await SalaService.listarSalas();
        setSalas(response)
      } catch (error) {
        console.error('Ocorreu um erro ao buscar dados', error)
      }

    } fetchSalas();
  }, [])

  const diasSemana = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA"];
  const horarios = ["17:00", "17:50", "18:40", "19:30", "20:20", "21:10"];

  const getDisciplinaByTurmaId = (turmaId) => {
    const turma = turmas.find((t) => t.id === turmaId);
    return turma ? `${turma.disciplinaDTO.codigo}` : "N/A";
  };

  const getSalaByAula = (salaId) => {
    const sala = salas.find((s) => s.id === salaId);
    return sala ? `${sala.nome}` : "N/A";
  };

  const parseTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return date;
  };

  function gerarTabela() {
    return horarios.map((horario) => {
      const horarioAtual = parseTime(horario);

      return (
        <TableRow key={horario}>
          <TableCell sx={{ minHeight: '60px', maxWidth: '60px', textAlign: 'center' }}>
            {horario}
          </TableCell>
          {diasSemana.map((dia) => {
            if (isAdmin) {
              return (
                <TableCell 
                  key={`${dia}-${horario}`} 
                  sx={{ verticalAlign: 'middle', textAlign: 'center', maxWidth: '60px' }}
                >
                  -
                </TableCell>
              );
            }

            const aula = aulas.find((a) => {
              const horarioInicio = parseTime(a.horarioInicio.slice(0, 5));
              const horarioFim = new Date(horarioInicio.getTime() + a.duracao * 60000);

              return (
                a.diaSemana === dia &&
                horarioAtual >= horarioInicio &&
                horarioAtual < horarioFim
              );
            });

            return (
              <TableCell 
                key={`${dia}-${horario}`} 
                sx={{ verticalAlign: 'middle', textAlign: 'center', maxWidth: '60px' }}
              >
                {aula ? (
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <span>{getDisciplinaByTurmaId(aula.turmaId)}</span>
                    <span style={{ fontSize: '0.8em', marginTop: 2 }}>
                      {getSalaByAula(aula.salaId)}
                    </span>
                  </div>
                ) : (
                  '-'
                )}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }

  const handleDelete = async (id) => {
    try {
      await AulaService.deletarAula(id);
      setAulas((prevAulas) => prevAulas.filter((aula) => aula.id !== id));
      toast.success('Aula removida com sucesso');
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Não foi possível remover a aula');
    }
  };


  return (
    <Container>
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Minhas Aulas</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/aulas/cadastrar")}
            >
              Cadastrar Aula
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tabela de Horários */}
      <TableContainer component={Paper} sx={{ mt: 2, maxWidth: '100%', overflowX: 'auto' }}>
        <Table sx={{ '& td, & th': { textAlign: 'center', border: '1px solid #ddd' } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', maxWidth: '60px' }}>Horário</TableCell>
              {diasSemana.map((dia) => (
                <TableCell
                  key={dia}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                    maxWidth: '60px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dia}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{gerarTabela()}</TableBody>
        </Table>
      </TableContainer>

      {/* Tabela de Aulas */}
      {aulas.length !== 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
          <Table sx={{ '& td, & th': { textAlign: 'center',  } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Disciplina</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Dia da Semana</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Horário Início</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Sala</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aulas.map((aula) => (
                <TableRow key={aula.id}>
                  <TableCell>{getDisciplinaByTurmaId(aula.turmaId)}</TableCell>
                  <TableCell>{aula.diaSemana}</TableCell>
                  <TableCell>{aula.horarioInicio.slice(0, 5)}</TableCell>
                  <TableCell>{getSalaByAula(aula.salaId)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/aulas/editar/${aula.id}`)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(aula.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Aula;
