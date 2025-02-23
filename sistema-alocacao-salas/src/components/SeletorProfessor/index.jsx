import { TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorProfessor({ professores, professorSelecionado, onSelecionarProfessor }) {
  return (
    <TextField
      select
      label="Selecione o Professor"
      value={professorSelecionado || ''}
      onChange={(e) => onSelecionarProfessor(Number(e.target.value))}
      fullWidth
      margin="normal"
    >
      {professores.map(prof => (
        <MenuItem key={prof.id} value={prof.id}>
          {prof.nome}
        </MenuItem>
      ))}
    </TextField>
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
