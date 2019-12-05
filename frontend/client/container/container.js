import React from 'react';
import './container.css';
import ClientListContainer from "../list-container/list-container";

class ClientContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteHandler = (reviewId) => {
    this.props.deleteHandler(reviewId)
  };

  render() {
    return <div className="center card">
      <div className="card-body">
        <ClientListContainer deleteHandler={this.deleteHandler} />
      </div>
    </div>;
  }
}

export default ClientContainer;