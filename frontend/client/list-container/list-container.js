import React from 'react';
import ConfirmModal from '../../common/confirm/confirm';
import ReviewsList from './../list/list';
import { Client } from './../constants'

class ClientListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      showDeleteConfirmation: false,
      reviewDeleteId: false,
    };
  }

  serverActions = (type = 'get', itemId = '') => {
    return fetch(`${Client.listUrl}/${Client.userId}/${itemId}`, {
      method: type
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({isLoaded: true});
          type === 'get' && this.setState({items: result});
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

  showConfirmationDialog = (reviewId) => {
    this.setState({showDeleteConfirmation: true, reviewDeleteId: reviewId});
  };

  confirmDelete = (confirmed) => {
    this.setState({showDeleteConfirmation: false});

    if (confirmed) {
      return this.deleteReview(this.state.reviewDeleteId)
    }
  };

  /**
   * Service calls
   */

  deleteReview = (reviewId) => this.serverActions('delete', reviewId)
    .then(this.getReviews);

  getReviews = () => this.serverActions();

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div className={'bg-danger text-center p-2'}>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (items && items.length) {
        return <>
          <ReviewsList list={items} deleteHandler={this.showConfirmationDialog} />
          <ConfirmModal
            show={this.state.showDeleteConfirmation}
            onHide={this.confirmDelete}
            confirmLabel={'Delete review'}
            bodyText={'Confirm review delete?'}
            buttonType={'danger'}
          />
        </>;
      } else {
        return <div className={'bg-warning text-center p-2'}>{items.message || 'List is empty!'}</div>;
      }
    }
  }
}

export default ClientListContainer;