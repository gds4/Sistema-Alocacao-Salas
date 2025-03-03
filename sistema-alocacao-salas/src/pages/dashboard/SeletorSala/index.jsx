import { TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorSala({ salas, salaSelecionada, onSelecionarSala }) {
  return (
    <TextField
      select
      label="Selecione a Sala"
      value={salaSelecionada}
      onChange={(e) => onSelecionarSala(Number(e.target.value))}
      fullWidth
      margin="normal"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      
    >
      {salas.map(room => (
        <MenuItem key={room.id} value={room.id}>
          {room.nome}
        </MenuItem>
      ))}
    </TextField>
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
