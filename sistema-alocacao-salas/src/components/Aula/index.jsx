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
import AulaService from "../../services/aulaService";
import TurmaService from "../../services/turmaService";
  
   
  function Aula() {
    const navigate = useNavigate();
    const [aulas, setAulas] = useState([]);
    const [turmas, setTurmas] = useState([])

    useEffect(() => {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if(!usuario || !usuario.id){
        toast.error('Ocorreu um erro ao buscar dados, Faça login novamente');
        return;
      }
      async function fetchAulasProfessor() {
        try{
          const response = await AulaService.listarAulasPorProfessor(usuario.id);
          console.log('aulas do prof ->')
          console.log(response)
          setAulas(response)
        }catch(error){
          console.error('Ocorreu um erro ao buscar dados', error)
        }
        
      }fetchAulasProfessor();
    },[])

    useEffect(() => {
      
      async function fetchTurmasPorAulas() {
        try{
          const turmasIds = aulas.map(aula => aula.turmaId)
          const response = await TurmaService.buscarTurmasPorIds(turmasIds);
          setTurmas(response)
        }catch(error){
          console.error('Ocorreu um erro ao buscar dados', error)
        }
        
      }fetchTurmasPorAulas();
    },[aulas])
  
    const diasSemana = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA"];
    const horarios = ["17:00", "17:50", "18:40", "19:30", "20:20", "21:10"];
  
    const getDisciplinaByTurmaId = (turmaId) => {
      const turma = turmas.find((t) => t.id === turmaId);
      return turma ? `${turma.disciplinaDTO.codigo}` : "N/A";
    };
  
    const parseTime = (time) => {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      return date;
    };
  
    const generateTable = () => {
      return horarios.map((horario) => {
        const horarioAtual = parseTime(horario);
  
        return (
          <TableRow key={horario}>
            <TableCell>{horario}</TableCell>
            {diasSemana.map((dia) => {
              const aula = aulas.find((a) => {
                const horarioInicio = parseTime(a.horarioInicio.slice(0, 5));
                const horarioFim = new Date(horarioInicio.getTime() + a.duracao * 60000);
  
                return (
                  a.diaSemana === dia &&
                  horarioAtual >= horarioInicio &&
                  horarioAtual < horarioFim
                );
              });
  
              if (aula) {
                const codigoDisciplina = getDisciplinaByTurmaId(aula.turmaId);
                return <TableCell key={`${dia}-${horario}`}>{codigoDisciplina}</TableCell>;
              } else {
                return <TableCell key={`${dia}-${horario}`}></TableCell>;
              }
            })}
          </TableRow>
        );
      });
    };
  
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Horário</TableCell>
                {diasSemana.map((dia) => (
                  <TableCell key={dia}>{dia}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{generateTable()}</TableBody>
          </Table>
        </TableContainer>
  
        { aulas.length !== 0 && <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Disciplina - Semestre</TableCell>
                <TableCell>Dia da Semana</TableCell>
                <TableCell>Horário Início</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aulas.map((aula) => (
                <TableRow key={aula.id}>
                  <TableCell>{getDisciplinaByTurmaId(aula.turmaId)}</TableCell>
                  <TableCell>{aula.diaSemana}</TableCell>
                  <TableCell>{aula.horarioInicio.slice(0, 5)}</TableCell>
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
        </TableContainer>}
      </Container>
    );
  }
  
  export default Aula;
  