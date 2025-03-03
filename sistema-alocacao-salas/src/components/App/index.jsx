import { useState } from 'react';
import Login from '../../pages/Login';
import Dashboard from '../../pages/dashboard/Dashboard';


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