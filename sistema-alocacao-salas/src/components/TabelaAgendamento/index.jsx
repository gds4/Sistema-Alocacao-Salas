import PropTypes from 'prop-types';


// Exemplo de dias da semana
const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const timeSlots = ['17:00', '17:50', '18:40', '19:30', '20:20'];

function TabelaAgendamento({ schedule }) {
 // Função auxiliar para encontrar uma aula por dia e horário
 function getAula(day, time) {
  return schedule.find(aula => aula.diaSemana === day && aula.horarioInicio === time);
}

return (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Horário</th>
        {daysOfWeek.map(day => (
          <th key={day}>{day}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {timeSlots.map(time => (
        <tr key={time}>
          <td>{time}</td>
          {daysOfWeek.map(day => {
            const aula = getAula(day, time);
            return (
              <td key={day}>
                {aula ? (
                  <div>
                    <strong>Disciplina ID: {aula.disciplinaId}</strong>
                    <br />
                    Duração: {aula.duracao} min
                  </div>
                ) : (
                  '-'
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);
};

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