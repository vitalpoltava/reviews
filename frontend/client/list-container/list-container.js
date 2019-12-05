import React from 'react';
import ReviewsList from './../list/list';
import Client from './../constants'

class ClientListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  serverActions = (type = 'get', itemId = '') => {
    return fetch(`${Client.listUrl}/${Client.userId}/${itemId}`, {
      method: type
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => this.serverActions();

  deleteReview = (reviewId) => this.serverActions('delete', reviewId)
    .then(this.getReviews);

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div className={'bg-danger text-center p-2'}>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (items && items.length) {
        return <ReviewsList list={items} deleteHandler={this.deleteReview} />;
      } else {
        return <div className={'bg-warning text-center p-2'}>{items.message || 'List is empty!'}</div>;
      }
    }
  }
}

export default ClientListContainer;