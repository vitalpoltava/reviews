import React from 'react';
import './container.css';
import ClientListContainer from "../list-container/list-container";

function ClientContainer(props) {
  const deleteHandler = (reviewId) => {
    props.deleteHandler(reviewId)
  };

  return (
    <div className="center20 card client-container">
      <div className="card-body">
        <ClientListContainer deleteHandler={deleteHandler}/>
      </div>
    </div>
  );
}

export default ClientContainer;