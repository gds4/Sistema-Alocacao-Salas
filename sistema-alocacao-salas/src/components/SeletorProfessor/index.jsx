import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorProfessor({ professores, professorSelecionado, onSelecionarProfessor }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="professor-select-label">Selecione o Professor</InputLabel>
      <Select
        labelId="professor-select-label"
        value={professorSelecionado || ''}
        onChange={(e) => onSelecionarProfessor(Number(e.target.value))}
      >
        {professores.map(prof => (
          <MenuItem key={prof.id} value={prof.id}>{prof.nome}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SeletorProfessor.propTypes = {
  professores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  professorSelecionado: PropTypes.number,
  onSelecionarProfessor: PropTypes.func.isRequired,
};

export default SeletorProfessor;
