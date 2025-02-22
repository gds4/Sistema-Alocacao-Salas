import { useEffect, useState } from 'react';
import { Container, Typography, Button, ButtonGroup } from '@mui/material';
import TabelaAgendamento from '../TabelaAgendamento';
import TabelaProfessor from '../TabelaProfessor';
import TabelaDisciplina from '../TabelaDisciplina';
import SeletorSala from '../SeletorSala';
import SeletorProfessor from '../SeletorProfessor';
import SeletorDisciplina from '../SeletorDisciplina';
import SalaService from '../../services/salaService';
import AulaService from '../../services/aulaService';
import TurmaService from '../../services/turmaService';
import UsuarioService from '../../services/usuarioService';
import { toast } from 'react-toastify';
import DisciplinaService from '../../services/disciplinaService';

function Dashboard() {

  // Estado para controle da tabela ativa: 'sala', 'professor' ou 'disciplina'
  const [telaAtivada, setTelaAtivada] = useState('sala');

  // Estados para a visualização por sala
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [agendamentosSala, setAgendamentosSala] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmasSala, setTurmasSala] = useState([]);

  // Estados para a visualização por professor
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [agendamentosProfessor, setAgendamentosProfessor] = useState([]);
  const [turmasProfessor, setTurmasProfessor] = useState([]);
  const [professores, setProfessores] = useState([]);

  // Estados para a visualização por disciplina
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [agendamentosDisciplina, setAgendamentosDisciplina] = useState([]);
  const [turmasDisciplina, setTurmasDisciplina] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  // ----- VISUALIZAÇÃO POR SALA -----
  useEffect(() => {
    if (telaAtivada !== 'sala') return;
    async function buscarSalas() {
      try {
        const response = await SalaService.listarSalas();
        setSalas(response);
        setSalaSelecionada(response[0]?.id || null);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    }
    buscarSalas();
  }, [telaAtivada]);

  useEffect(() => {
    if (telaAtivada !== 'sala' || !salaSelecionada) return;
    async function buscarAulas() {
      try {
        const response = await AulaService.listarAulasPorSala(salaSelecionada);
        setAgendamentosSala(response);
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        setAgendamentosSala([]);
      }
    }
    buscarAulas();
  }, [telaAtivada, salaSelecionada]);

  useEffect(() => {
    if (telaAtivada !== 'sala') return;
    const turmaIds = [...new Set(agendamentosSala.map(aula => aula.turmaId))];
    if (turmaIds.length === 0) {
      setTurmasSala([]);
      return;
    }
    async function buscarTurmas() {
      try {
        const response = await TurmaService.buscarTurmasPorIds(turmaIds);
        setTurmasSala(response);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    }
    buscarTurmas();
  }, [telaAtivada, agendamentosSala]);

  // ----- VISUALIZAÇÃO POR PROFESSOR -----
  useEffect(() => {
    if (telaAtivada !== 'professor') return;
    async function buscarProfessores() {
      try {
        const response = await UsuarioService.listarUsuariosComRoleProfessor();
        setProfessores(response);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao buscar professor');
      }
    }
    buscarProfessores();
  }, [telaAtivada]);

  useEffect(() => {
    if (telaAtivada !== 'professor' || !professorSelecionado) return;
    async function buscarAulasProfessor() {
      try {
        const response = await AulaService.listarAulasPorProfessor(professorSelecionado);
        setAgendamentosProfessor(response);
      } catch (error) {
        console.error('Erro ao buscar aulas do professor:', error);
        setAgendamentosProfessor([]);
      }
    }
    buscarAulasProfessor();
  }, [telaAtivada, professorSelecionado]);

  useEffect(() => {
    if (telaAtivada !== 'professor') return;
    const turmaIds = [...new Set(agendamentosProfessor.map(aula => aula.turmaId))];
    if (turmaIds.length === 0) {
      setTurmasProfessor([]);
      return;
    }
    async function buscarTurmas() {
      try {
        const response = await TurmaService.buscarTurmasPorIds(turmaIds);
        setTurmasProfessor(response);
      } catch (error) {
        console.error('Erro ao buscar turmas para professor:', error);
      }
    }
    buscarTurmas();
  }, [telaAtivada, agendamentosProfessor]);

  // ----- VISUALIZAÇÃO POR DISCIPLINA -----
  useEffect(() => {
    if(telaAtivada !== 'disciplina') return;
    async function buscarDisciplinas() {
      try {
        const response = await DisciplinaService.listarDisciplinas();
        setDisciplinas(response);
        setDisciplinaSelecionada(response[0]?.id || null);
      } catch(error) {
        console.error('Erro ao listar disciplinas', error)
      }
    }
    buscarDisciplinas();
  },[telaAtivada]);

  useEffect(() => {
    if (telaAtivada !== 'disciplina' || !disciplinaSelecionada) return;
    async function buscarTurmasDisciplina() {
      try {
        const response = await DisciplinaService.listarTurmasPorDisciplina(disciplinaSelecionada);
        setTurmasDisciplina(response);
      } catch (error) {
        console.error('Erro ao buscar turmas da disciplina:', error);
      }
    }
    buscarTurmasDisciplina();
  }, [telaAtivada, disciplinaSelecionada]);

  useEffect(() => {
    if (telaAtivada !== 'disciplina') return;
    const turmaIds = [...new Set(turmasDisciplina.map(turma => turma.id))];
    if (turmaIds.length === 0) {
      setAgendamentosDisciplina([]);
      return;
    }
    async function buscarAulasDisciplina() {
      try {
        const response = await AulaService.listarAulasPorTurmas(turmaIds);
        setAgendamentosDisciplina(response);
      } catch (error) {
        console.error('Erro ao buscar turmas para disciplina:', error);
      }
    }
    buscarAulasDisciplina();
  }, [telaAtivada, turmasDisciplina]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard de Aulas</Typography>
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        <Button onClick={() => setTelaAtivada('sala')}>Salas</Button>
        <Button onClick={() => setTelaAtivada('professor')}>Professor</Button>
        <Button onClick={() => setTelaAtivada('disciplina')}>Disciplina</Button>
      </ButtonGroup>

      {telaAtivada === 'sala' && (
        <>
          <SeletorSala
            salas={salas}
            salaSelecionada={salaSelecionada}
            onSelecionarSala={setSalaSelecionada}
          />
          {salaSelecionada && (
            <TabelaAgendamento
              agendamentos={agendamentosSala}
              turmas={turmasSala}
            />
          )}
        </>
      )}

      {telaAtivada === 'professor' && (
        <>
          <SeletorProfessor
            professores={professores}
            professorSelecionado={professorSelecionado}
            onSelecionarProfessor={setProfessorSelecionado}
          />
          {professorSelecionado && (
            <TabelaProfessor
              agendamentos={agendamentosProfessor}
              turmas={turmasProfessor}
            />
          )}
        </>
      )}

      {telaAtivada === 'disciplina' && (
        <>
          <SeletorDisciplina
            disciplinas={disciplinas}
            disciplinaSelecionada={disciplinaSelecionada}
            onSelecionarDisciplina={setDisciplinaSelecionada}
          />
          {disciplinaSelecionada && (
            <TabelaDisciplina
              agendamentos={agendamentosDisciplina}
              turmas={turmasDisciplina}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Dashboard;