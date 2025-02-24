import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TabelaDisciplina({ agendamentos, turmas }) {
  const daysOfWeek = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];
  const timeSlots = ['17:00', '17:50', '18:40', '19:30', '20:20', '21:10'];

  const parseTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return date;
  };

  const getAula = (day, time) => {
    const horarioAtual = parseTime(time);
    return agendamentos.find((aula) => {
      const horarioInicio = parseTime(aula.horarioInicio.slice(0, 5));
      const horarioFim = new Date(horarioInicio.getTime() + aula.duracao * 60000);
      return aula.diaSemana === day &&
             horarioAtual >= horarioInicio &&
             horarioAtual < horarioFim;
    });
  };

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
                  <TableCell key={day}  sx={{ textAlign: 'center' }}>
                    {aula ? (
                      <div>
                        <Typography variant="body2" fontWeight="bold">
                          {turmas.find(t => t.id === aula.turmaId)?.disciplinaDTO.codigo || '-'}
                        </Typography>
                        <Typography variant="caption" >
                          {'T' + turmas.find(t => t.id === aula.turmaId)?.id || '-'}
                        </Typography>
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

TabelaDisciplina.propTypes = {
  agendamentos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      turmaId: PropTypes.number.isRequired,
      salaId: PropTypes.number.isRequired,
      diaSemana: PropTypes.string.isRequired,
      horarioInicio: PropTypes.string.isRequired,
      duracao: PropTypes.number.isRequired,
      professorId: PropTypes.number.isRequired,
    })
  ).isRequired,
  turmas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      disciplinaDTO: PropTypes.shape({
        codigo: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
      }).isRequired,
      semestre: PropTypes.string.isRequired,
      idProfessor: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TabelaDisciplina;
