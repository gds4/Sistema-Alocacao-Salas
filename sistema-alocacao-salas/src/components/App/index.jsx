import { useState } from 'react';
import Login from '../Login';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <h2>Bem-vindo, você está logado!</h2>
      )}
    </div>
  );
}

export default App;