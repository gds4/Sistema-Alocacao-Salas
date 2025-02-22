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

// mocks.js

// Salas disponíveis
const salasMock = [
  { id: 1, nome: 'Lab 6' },
  { id: 2, nome: 'Sala 1sd' },
  { id: 3, nome: 'Sala 2123' },
  { id: 4, nome: 'Sala drsdf' },
  { id: 5, nome: 'sdfdfssdf' },
];

// Aulas distribuídas ao longo da semana com horários e durações definidas
const aulasMock = [
  // Segunda-feira (SEGUNDA)
  { id: 1, turmaId: 1, salaId: 1, diaSemana: 'SEGUNDA', horarioInicio: '17:00:00', duracao: 50,  professorId: 1 },
  { id: 2, turmaId: 2, salaId: 2, diaSemana: 'SEGUNDA', horarioInicio: '17:50:00', duracao: 50,  professorId: 2 },
  { id: 3, turmaId: 3, salaId: 3, diaSemana: 'SEGUNDA', horarioInicio: '18:40:00', duracao: 100, professorId: 3 },

  // Terça-feira (TERCA)
  { id: 4, turmaId: 4, salaId: 1, diaSemana: 'TERCA', horarioInicio: '17:00:00', duracao: 50,  professorId: 1 },
  { id: 5, turmaId: 5, salaId: 2, diaSemana: 'TERCA', horarioInicio: '17:50:00', duracao: 50,  professorId: 2 },
  { id: 6, turmaId: 6, salaId: 4, diaSemana: 'TERCA', horarioInicio: '19:30:00', duracao: 50,  professorId: 3 },

  // Quarta-feira (QUARTA)
  { id: 7, turmaId: 1, salaId: 3, diaSemana: 'QUARTA', horarioInicio: '17:00:00', duracao: 50,  professorId: 1 },
  { id: 8, turmaId: 2, salaId: 4, diaSemana: 'QUARTA', horarioInicio: '17:50:00', duracao: 100, professorId: 2 },
  { id: 9, turmaId: 3, salaId: 5, diaSemana: 'QUARTA', horarioInicio: '20:20:00', duracao: 50,  professorId: 3 },

  // Quinta-feira (QUINTA)
  { id: 10, turmaId: 4, salaId: 2, diaSemana: 'QUINTA', horarioInicio: '18:40:00', duracao: 50, professorId: 1 },
  { id: 11, turmaId: 5, salaId: 3, diaSemana: 'QUINTA', horarioInicio: '19:30:00', duracao: 50, professorId: 2 },

  // Sexta-feira (SEXTA)
  { id: 12, turmaId: 6, salaId: 1, diaSemana: 'SEXTA', horarioInicio: '17:00:00', duracao: 50,  professorId: 3 },
  { id: 13, turmaId: 1, salaId: 2, diaSemana: 'SEXTA', horarioInicio: '17:50:00', duracao: 100, professorId: 1 },
  { id: 14, turmaId: 2, salaId: 4, diaSemana: 'SEXTA', horarioInicio: '20:20:00', duracao: 50,  professorId: 2 },
];

// Turmas, cada uma associada a uma disciplina e a um professor
const turmasMock = [
  { id: 1, disciplinaDTO: { id: 101, codigo: "MAT101", nome: "Matemática I" }, semestre: "2024.2", idProfessor: 1 },
  { id: 2, disciplinaDTO: { id: 102, codigo: "PROG102", nome: "Programação I" }, semestre: "2024.2", idProfessor: 2 },
  { id: 3, disciplinaDTO: { id: 103, codigo: "BD103", nome: "Banco de Dados I" }, semestre: "2024.2", idProfessor: 3 },
  { id: 4, disciplinaDTO: { id: 104, codigo: "MAT104", nome: "Matemática II" }, semestre: "2024.2", idProfessor: 1 },
  { id: 5, disciplinaDTO: { id: 105, codigo: "PROG105", nome: "Programação II" }, semestre: "2024.2", idProfessor: 2 },
  { id: 6, disciplinaDTO: { id: 106, codigo: "BD106", nome: "Banco de Dados II" }, semestre: "2024.2", idProfessor: 3 },
];

// Professores disponíveis
const professoresMock = [
  { id: 1, nome: "Prof. João" },
  { id: 2, nome: "Profª. Maria" },
  { id: 3, nome: "Prof. Carlos" },
];

// Disciplinas extraídas das turmas
const disciplinasMock = [
  { id: 101, codigo: "MAT101", nome: "Matemática I" },
  { id: 102, codigo: "PROG102", nome: "Programação I" },
  { id: 103, codigo: "BD103", nome: "Banco de Dados I" },
  { id: 104, codigo: "MAT104", nome: "Matemática II" },
  { id: 105, codigo: "PROG105", nome: "Programação II" },
  { id: 106, codigo: "BD106", nome: "Banco de Dados II" },
];

function Dashboard() {
  // Estado para controle da visualização ativa: 'room', 'teacher' ou 'discipline'
  const [activeView, setActiveView] = useState('room');

  // Estados para a visualização por sala
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scheduleRoom, setScheduleRoom] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [turmasRoom, setTurmasRoom] = useState([]);

  // Estados para a visualização por professor
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [scheduleTeacher, setScheduleTeacher] = useState([]);
  const [turmasTeacher, setTurmasTeacher] = useState([]);
  const [professores, setProfessores] = useState([]);

  // Estados para a visualização por disciplina
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [scheduleDisciplina, setScheduleDisciplina] = useState([]);
  const [turmasDisciplina, setTurmasDisciplina] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [disciplinas, setDisciplinas] = useState([]);

  // ----- VISUALIZAÇÃO POR SALA -----
  useEffect(() => {
    if (activeView !== 'room') return;
    async function fetchSalas() {
      try {
        const response = await SalaService.listarSalas();
        console.log('listasalas')
        console.log(response)
        setRooms(response);
        setSelectedRoom(response[0]?.id || null);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    }
    fetchSalas();
  }, [activeView]);

  useEffect(() => {
    if (activeView !== 'room' || !selectedRoom) return;
    async function fetchAulas() {
      try {
        const response = await AulaService.listarAulasPorSala(selectedRoom);
        console.log('aulas por sala')
        console.log(response)
        setScheduleRoom(response);
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        setScheduleRoom([]);
      }
    }
    fetchAulas();
  }, [activeView, selectedRoom]);

  useEffect(() => {
    if (activeView !== 'room') return;
    const turmaIds = [...new Set(scheduleRoom.map(aula => aula.turmaId))];
    console.log('buscar turmas das aulas')
    console.log(turmaIds)
    if (turmaIds.length === 0) {
      setTurmasRoom([]);
      return;
    }
    async function fetchTurmas() {
      try {
        const response = await TurmaService.buscarTurmasPorIds(turmaIds);
        console.log(response)
        setTurmasRoom(response);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    }
    fetchTurmas();
  }, [activeView, scheduleRoom]);

  // ----- VISUALIZAÇÃO POR PROFESSOR -----
  useEffect(() => {
    if (activeView !== 'teacher') return;
    async function fetchProfessores() {
      try {
        const response = await UsuarioService.listarUsuariosComRoleProfessor();
        setProfessores(response);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao buscar professor');
      }
    }
    fetchProfessores();
  }, [activeView]);

  useEffect(() => {
    if (activeView !== 'teacher' || !selectedProfessor) return;
    async function fetchAulasProfessor() {
      try {
        const response = await AulaService.listarAulasPorProfessor(selectedProfessor);
        setScheduleTeacher(response);
      } catch (error) {
        console.error('Erro ao buscar aulas do professor:', error);
        setScheduleTeacher([]);
      }
    }
    fetchAulasProfessor();
  }, [activeView, selectedProfessor]);

  useEffect(() => {
    if (activeView !== 'teacher') return;
    const turmaIds = [...new Set(scheduleTeacher.map(aula => aula.turmaId))];
    if (turmaIds.length === 0) {
      setTurmasTeacher([]);
      return;
    }
    async function fetchTurmas() {
      try {
        const response = await TurmaService.buscarTurmasPorIds(turmaIds);
        setTurmasTeacher(response);
      } catch (error) {
        console.error('Erro ao buscar turmas para professor:', error);
      }
    }
    fetchTurmas();
  }, [activeView, scheduleTeacher]);

  // ----- VISUALIZAÇÃO POR DISCIPLINA -----
  useEffect(() => {
    if (activeView !== 'discipline' || !selectedDisciplina) return;
    async function fetchAulasDisciplina() {
      try {
        const response = await AulaService.listarAulasPorDisciplina(selectedDisciplina);
        setScheduleDisciplina(response);
      } catch (error) {
        console.error('Erro ao buscar aulas da disciplina:', error);
      }
    }
    fetchAulasDisciplina();
  }, [activeView, selectedDisciplina]);

  useEffect(() => {
    if (activeView !== 'discipline') return;
    const turmaIds = [...new Set(scheduleDisciplina.map(aula => aula.turmaId))];
    if (turmaIds.length === 0) {
      setTurmasDisciplina([]);
      return;
    }
    async function fetchTurmas() {
      try {
        const response = await TurmaService.buscarTurmasPorIds(turmaIds);
        setTurmasDisciplina(response);
      } catch (error) {
        console.error('Erro ao buscar turmas para disciplina:', error);
      }
    }
    fetchTurmas();
  }, [activeView, scheduleDisciplina]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard de Aulas</Typography>
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        <Button onClick={() => setActiveView('room')}>Salas</Button>
        <Button onClick={() => setActiveView('teacher')}>Professor</Button>
        <Button onClick={() => setActiveView('discipline')}>Disciplina</Button>
      </ButtonGroup>

      {activeView === 'room' && (
        <>
          <SeletorSala
            rooms={rooms}
            selectedRoom={selectedRoom}
            onRoomSelect={setSelectedRoom}
          />
          {selectedRoom && (
            <TabelaAgendamento
              schedule={scheduleRoom}
              turmas={turmasRoom}
            />
          )}
        </>
      )}

      {activeView === 'teacher' && (
        <>
          <SeletorProfessor
            professors={professores}
            selectedProfessor={selectedProfessor}
            onProfessorSelect={setSelectedProfessor}
          />
          {selectedProfessor && (
            <TabelaProfessor
              schedule={scheduleTeacher}
              turmas={turmasTeacher}
            />
          )}
        </>
      )}

      {activeView === 'discipline' && (
        <>
          <SeletorDisciplina
            disciplinas={disciplinas}
            selectedDisciplina={selectedDisciplina}
            onDisciplinaSelect={setSelectedDisciplina}
          />
          {selectedDisciplina && (
            <TabelaDisciplina
              schedule={scheduleDisciplina}
              turmas={turmasDisciplina}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Dashboard;
