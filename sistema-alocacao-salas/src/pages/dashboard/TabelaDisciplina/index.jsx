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

  const getAulas = (day, time) => {
    const horarioAtual = parseTime(time);
    return agendamentos.filter((aula) => {
      const horarioInicio = parseTime(aula.horarioInicio.slice(0, 5));
      const horarioFim = new Date(horarioInicio.getTime() + aula.duracao * 60000);
      return aula.diaSemana === day &&
        horarioAtual >= horarioInicio &&
        horarioAtual < horarioFim;
    });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxWidth: '100%', overflowX: 'auto' }}>
      <Table sx={{ '& td, & th': { textAlign: 'center', border: '1px solid #ddd' } }}>
        <TableHead>
          <TableRow>
            <TableCell 
              sx={{ 
                fontWeight: 'bold', 
                backgroundColor: '#f5f5f5', 
                maxWidth: '60px',
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap'
              }}
            >
              Horário
            </TableCell>
            {daysOfWeek.map(day => (
              <TableCell 
                key={day} 
                sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: '#f5f5f5', 
                  maxWidth: '60px',
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap'
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map(time => (
            <TableRow key={time}>
              <TableCell 
                sx={{ 
                  minHeight: '60px', 
                  maxWidth: '60px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap'
                }}
              >
                {time}
              </TableCell>
              {daysOfWeek.map(day => {
                const aulas = getAulas(day, time);
                const turmasNaCelula = aulas.map(aula => 
                  turmas.find(t => t.id === aula.turmaId)
                ).filter(Boolean);

                return (
                  <TableCell 
                    key={day} 
                    sx={{ 
                      minHeight: '60px', 
                      verticalAlign: 'middle', 
                      maxWidth: '60px',
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {turmasNaCelula.length > 0 ? (
                      <div>
                        <Typography variant="body2" fontWeight="bold">
                          {turmasNaCelula[0]?.disciplinaDTO.codigo || '-'}
                        </Typography>
                        <Typography variant="caption">
                          {turmasNaCelula
                            .map(t => `T${t.id}`)
                            .join(' / ')}
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
