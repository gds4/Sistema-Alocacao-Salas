import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorDisciplina({ disciplinas, selectedDisciplina, onDisciplinaSelect }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="disciplina-select-label">Selecione a Disciplina</InputLabel>
      <Select
        labelId="disciplina-select-label"
        value={selectedDisciplina || ''}
        onChange={(e) => onDisciplinaSelect(Number(e.target.value))}
      >
        {disciplinas.map(disc => (
          <MenuItem key={disc.id} value={disc.id}>
            {disc.codigo} - {disc.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
  selectedDisciplina: PropTypes.number,
  onDisciplinaSelect: PropTypes.func.isRequired,
};

export default SeletorDisciplina;
