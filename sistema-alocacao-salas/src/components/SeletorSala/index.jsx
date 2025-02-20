import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function SeletorSala({ rooms, selectedRoom, onRoomSelect }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="room-select-label">Selecione a Sala</InputLabel>
      <Select
        labelId="room-select-label"
        value={selectedRoom}
        onChange={(e) => onRoomSelect(Number(e.target.value))}
      >
        {rooms.map(room => (
          <MenuItem key={room.id} value={room.id}>{room.nome}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SeletorSala.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRoom: PropTypes.number.isRequired,
  onRoomSelect: PropTypes.func.isRequired,
};

export default SeletorSala;
