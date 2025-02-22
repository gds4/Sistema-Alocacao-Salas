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
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../services/aulaService";
  
   
  function Aula() {
    const navigate = useNavigate();
    const [aulas, setAulas] = useState([
      {
        id: 1,
        turmaId: 1,
        salaId: 2,
        diaSemana: "SEGUNDA",
        horarioInicio: "17:00:00",
        duracao: 50,
        professorId: 1,
      },
      {
        id: 2,
        turmaId: 2,
        salaId: 1,
        diaSemana: "TERCA",
        horarioInicio: "17:00:00",
        duracao: 100,
        professorId: 1,
      },
      {
        id: 3,
        turmaId: 3,
        salaId: 3,
        diaSemana: "QUARTA",
        horarioInicio: "19:30:00",
        duracao: 50,
        professorId: 1,
      },
    ]);
  
    const turmasMock = [
      {
        id: 1,
        disciplinaDTO: {
          id: 1,
          codigo: "INF012",
          nome: "Matemática",
        },
        semestre: "2024.2",
        idProfessor: 1,
      },
      {
        id: 2,
        disciplinaDTO: {
          id: 2,
          codigo: "INF019",
          nome: "Programação Orientada a Objetos",
        },
        semestre: "2024.2",
        idProfessor: 1,
      },
      {
        id: 3,
        disciplinaDTO: {
          id: 3,
          codigo: "INF008",
          nome: "Banco de Dados",
        },
        semestre: "2024.2",
        idProfessor: 1,
      },
    ];
  
    const diasSemana = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA"];
    const horarios = ["17:00", "17:50", "18:40", "19:30", "20:20"];
  
    const getDisciplinaByTurmaId = (turmaId) => {
      const turma = turmasMock.find((t) => t.id === turmaId);
      return turma ? `${turma.disciplinaDTO.codigo} - ${turma.semestre}` : "N/A";
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
  
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
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
        </TableContainer>
      </Container>
    );
  }
  
  export default Aula;
  