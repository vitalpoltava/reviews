import React, {useEffect, useState} from 'react';
import ConfirmModal from '../../common/confirm/confirm';
import ReviewsList from './../list/list';
import { Client } from '../../constants'

function ClientListContainer() {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    items: [],
    showDeleteConfirmation: false,
    reviewDeleteId: false,
  });

  const mergeState = (partialState) => setState(prevState => ({
    ...prevState,
    ...partialState,
  }));

  const { error, isLoaded, items } = state;

  const serverActions = (type = 'get', itemId = '') => {
    return fetch(`${Client.listUrl}/${Client.userId}/${itemId}`, {
      method: type
    })
      .then(res => res.json())
      .then(
        (result) => {
          mergeState({isLoaded: true});
          type === 'get' && mergeState({items: result});
        },
        (error) => {
          mergeState({
            isLoaded: true,
            error
          });
        }
      )
  };

  useEffect(() => {
    getReviews();
  }, []);

  const showConfirmationDialog = (reviewId) => {
    mergeState({showDeleteConfirmation: true, reviewDeleteId: reviewId});
  };

  const confirmDelete = (confirmed) => {
    mergeState({showDeleteConfirmation: false});

    if (confirmed) {
      return deleteReview(state.reviewDeleteId)
    }
  };

  const deleteReview = (reviewId) => serverActions('delete', reviewId)
    .then(getReviews);

  const getReviews = () => serverActions();

  if (error) {
    return <div className={'bg-danger text-center p-2'}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (items && items.length) {
      return (
        <div>
          <ReviewsList list={items} deleteHandler={showConfirmationDialog} />
          <ConfirmModal
            show={state.showDeleteConfirmation}
            onHide={confirmDelete}
            confirmLabel={'Delete review'}
            bodyText={'Confirm review delete?'}
            buttonType={'danger'}
          />
        </div>
      );
    } else {
      return <div className={'bg-warning text-center p-2'}>{items.message || 'List is empty!'}</div>;
    }
  }
}

export default ClientListContainer;