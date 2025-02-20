// src/components/Salas.js
import { useState } from 'react';
import axios from 'axios';

const Salas = () => {
  const [nomeSala, setNomeSala] = useState('');  
  const [sala, setSala] = useState(null); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  

 
  const handleInputChange = async (event) => {
    const valorSala = event.target.value;
    setNomeSala(valorSala);

    if (valorSala.trim() !== '') {
      setLoading(true);
      setError(null);

      try {
       
        const response = await axios.get(`http://localhost:8082/salas?nome=${valorSala}`);
        
        if (response.data) {
          setSala(response.data);
        } else {
          setSala(null);  
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Erro ao carregar a sala');
      } finally {
        setLoading(false);
      }
    } else {
      setSala(null);  
    }
  };

  return (
    <div>
      <h1>Buscar Sala</h1>

      <input
        type="text"
        value={nomeSala}
        onChange={handleInputChange}
        placeholder="Digite o nome da sala"
      />
      
      {loading && <p>Carregando...</p>}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {sala && (
        <div>
          <h2>Detalhes da Sala</h2>
          <p><strong>ID:</strong> {sala.id}</p>
          <p><strong>Nome:</strong> {sala.nome}</p>
          <p><strong>Capacidade:</strong> {sala.capacidade}</p>
        </div>
      )}
      
      {nomeSala && !loading && !sala && !error && <p>Nenhuma sala encontrada</p>}
    </div>
  );
};

export default Salas;
