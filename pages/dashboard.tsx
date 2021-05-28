import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <h1>
      Dashboard
      <p>{user?.email}</p>
    </h1>
  );
}

export default Dashboard;
