import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorSala({ salas, salaSelecionada, onSelecionarSala }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="room-select-label">Selecione a Sala</InputLabel>
      <Select
        labelId="room-select-label"
        value={salaSelecionada}
        onChange={(e) => onSelecionarSala(Number(e.target.value))}
      >
        {salas.map(room => (
          <MenuItem key={room.id} value={room.id}>{room.nome}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SeletorSala.propTypes = {
  salas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  salaSelecionada: PropTypes.number.isRequired,
  onSelecionarSala: PropTypes.func.isRequired,
};

export default SeletorSala;
