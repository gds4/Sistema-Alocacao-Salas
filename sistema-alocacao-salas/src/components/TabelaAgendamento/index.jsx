import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TabelaAgendamento({ schedule }) {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const timeSlots = ['17:00', '17:50', '18:40', '19:30', '20:20'];

  function getAula(day, time) {
    return schedule.find(aula => aula.diaSemana === day && aula.horarioInicio === time);
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Horário</TableCell>
            {daysOfWeek.map(day => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map(time => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {daysOfWeek.map(day => {
                const aula = getAula(day, time);
                return (
                  <TableCell key={day}>
                    {aula ? (
                      <div>
                        <Typography variant="body2" fontWeight="bold">Disciplina ID: {aula.disciplinaId}</Typography>
                        <Typography variant="body2">Duração: {aula.duracao} min</Typography>
                      </div>
                    ) : '-'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TabelaAgendamento.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      disciplinaId: PropTypes.number.isRequired,
      salaId: PropTypes.number.isRequired,
      diaSemana: PropTypes.string.isRequired,
      horarioInicio: PropTypes.string.isRequired,
      duracao: PropTypes.number.isRequired,
    })
  ).isRequired
};

export default TabelaAgendamento;