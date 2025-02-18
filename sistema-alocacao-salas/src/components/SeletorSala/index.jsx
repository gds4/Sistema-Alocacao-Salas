import PropTypes from 'prop-types';

export function SeletorSala({ rooms, selectedRoom, onRoomSelect }) {
  return (
    <div className="mb-3">
      <label htmlFor="roomSelect" className="form-label">Selecione a Sala:</label>
      <select
        id="roomSelect"
        className="form-select"
        value={selectedRoom}
        onChange={(e) => onRoomSelect(Number(e.target.value))} // Conversão para número
      >
        <option value="">-- Escolha uma sala --</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>
            {room.nome}
          </option>
        ))}
      </select>
    </div>
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
