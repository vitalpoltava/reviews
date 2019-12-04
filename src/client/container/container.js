import React from 'react';
import './container.css';
import ClientList from "../list/list";

const ClientContainer = () =>
  <div className="center card">
    <div className="card-body">
      <ClientList />
    </div>
  </div>

export default ClientContainer;