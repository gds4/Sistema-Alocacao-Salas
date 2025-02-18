import { useState } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';


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
        <Dashboard/>
      )}
    </div>
  );
}

export default App;