import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TabelaAgendamento from '../TabelaAgendamento';
import SeletorSala from '../SeletorSala';

const salasMock = [
  { id: 1, nome: 'Lab 5' },
  { id: 2, nome: 'Sala 101' },
  { id: 3, nome: 'Sala 102' }
];

const aulasMock = [
  { id: 1, disciplinaId: 101, salaId: 1, diaSemana: 'Segunda', horarioInicio: '17:00', duracao: 50 },
  { id: 2, disciplinaId: 102, salaId: 1, diaSemana: 'Terça', horarioInicio: '17:50', duracao: 50 },
  { id: 3, disciplinaId: 103, salaId: 1, diaSemana: 'Quarta', horarioInicio: '18:40', duracao: 50 },
  { id: 4, disciplinaId: 104, salaId: 1, diaSemana: 'Quinta', horarioInicio: '19:30', duracao: 100 },
  { id: 5, disciplinaId: 105, salaId: 1, diaSemana: 'Sexta', horarioInicio: '20:20', duracao: 50 },
  { id: 6, disciplinaId: 106, salaId: 2, diaSemana: 'Segunda', horarioInicio: '17:00', duracao: 50 },
  { id: 7, disciplinaId: 107, salaId: 2, diaSemana: 'Terça', horarioInicio: '17:50', duracao: 50 },
  { id: 8, disciplinaId: 108, salaId: 3, diaSemana: 'Quarta', horarioInicio: '18:40', duracao: 50 },
  { id: 9, disciplinaId: 109, salaId: 3, diaSemana: 'Quinta', horarioInicio: '19:30', duracao: 50 }
];

function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState(salasMock[0].id);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const aulasFiltradas = aulasMock.filter(aula => aula.salaId === selectedRoom);
    setSchedule(aulasFiltradas);
  }, [selectedRoom]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard de Aulas</Typography>
      <SeletorSala rooms={salasMock} selectedRoom={selectedRoom} onRoomSelect={setSelectedRoom} />
      {selectedRoom && <TabelaAgendamento schedule={schedule} />}
    </Container>
  );
}

export default Dashboard;