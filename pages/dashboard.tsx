import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
      api.get('/me')
      .then(response => {
          console.log(response)
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <h1>
      Dashboard
      <p>{user?.email}</p>
    </h1>
  );
}

export default Dashboard;
