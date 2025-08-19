import React, { useState, useEffect } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('is_authenticated'));
    setIsAuthenticated(storedAuth || false);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
