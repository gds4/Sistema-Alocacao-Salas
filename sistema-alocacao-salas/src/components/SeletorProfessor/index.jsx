import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorProfessor({ professors, selectedProfessor, onProfessorSelect }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="professor-select-label">Selecione o Professor</InputLabel>
      <Select
        labelId="professor-select-label"
        value={selectedProfessor || ''}
        onChange={(e) => onProfessorSelect(Number(e.target.value))}
      >
        {professors.map(prof => (
          <MenuItem key={prof.id} value={prof.id}>{prof.nome}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SeletorProfessor.propTypes = {
  professors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedProfessor: PropTypes.number,
  onProfessorSelect: PropTypes.func.isRequired,
};

export default SeletorProfessor;
