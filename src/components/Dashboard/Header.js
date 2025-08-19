import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className="dashboard-header">
  <h1>✨ Employee Management</h1>
  <div className="header-actions">
    <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
      ➕ Add Employee
    </button>
    <Logout setIsAuthenticated={setIsAuthenticated} />
  </div>
</header>

  );
};

export default Header;
