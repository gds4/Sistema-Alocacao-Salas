import { TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorDisciplina({ disciplinas, disciplinaSelecionada, onSelecionarDisciplina }) {
  return (
    <TextField
      select
      label="Selecione a Disciplina"
      value={disciplinaSelecionada || ''}
      onChange={(e) => onSelecionarDisciplina(Number(e.target.value))}
      fullWidth
      margin="normal"
    >
      {disciplinas.map(disc => (
        <MenuItem key={disc.id} value={disc.id}>
          {disc.codigo} - {disc.nome}
        </MenuItem>
      ))}
    </TextField>
  );
}

SeletorDisciplina.propTypes = {
  disciplinas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      codigo: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  disciplinaSelecionada: PropTypes.number,
  onSelecionarDisciplina: PropTypes.func.isRequired,
};

export default SeletorDisciplina;
