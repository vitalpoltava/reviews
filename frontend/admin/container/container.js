import React, {useState, useEffect} from 'react';
import './container.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import {Admin} from "../../client/constants";
import UsersList from "../users-list/list";
import ConfirmModal from "../../common/confirm/confirm";

function AdminContainer() {
  const [state, setState] = useState({
    isLoading: false,
    userName: '',
    users: [],
    getError: false,
    postError: false,
    deleteError: false,
    showDeleteConfirmation: false,
    userDeleteId: false,
  });

  const mergeState = (partialState) => setState(prevState => ({
    ...prevState,
    ...partialState,
  }));

  const updateUserName = (e) => {
    mergeState({userName: e.target.value});
  };

  const serverActions = (type = 'get', payload = {}, id = '') => {
    let config = {
      method: type,
    };

    const postExtension = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    };

    if (type === 'post') {
      config = {...config, ...postExtension};
    }

    return fetch(`${Admin.usersUrl}/${id}`, config)
      .then(res => res.json())
      .then((result) => {
          if (result.message) {
            throw new Error(result);
          }
          type === 'get' && mergeState({users: result});
        }
      )
      .catch((error) => {
        if (type === 'get') {
          mergeState({getError: error});
        }
        if (type === 'post') {
          mergeState({postError: error});
        }
        if (type === 'delete') {
          mergeState({deleteError: error});
        }
      });
  };

  const submitUser = (e) => {
    e.preventDefault();

    mergeState({isLoading: true});
    serverActions('post', {name: state.userName})
      .then(() => {
        mergeState({userName: ''});
        getUsers();
      })
      .finally(() => {
        mergeState({isLoading: false});
      });
  };

  const deleteUser = (userId) => {
    mergeState({isLoading: true});
    serverActions('delete', {}, userId)
      .then(() => {
        getUsers();
      })
      .finally(() => {
        mergeState({isLoading: false});
      });
  };

  const getUsers = () => serverActions();

  useEffect(() => {
    getUsers();
  }, []);

  const dismissErrors = () => {
    mergeState({getError: false, postError: false, deleteError: false});
  };

  const showConfirmationDialog = (userId) => {
    mergeState({showDeleteConfirmation: true, userDeleteId: userId});
  };

  const confirmDelete = (confirmed) => {
    mergeState({showDeleteConfirmation: false});

    if (confirmed) {
      return deleteUser(state.userDeleteId)
    }
  };

  return (
    <div className='center30 admin-container'>
      <Card>
        <Card.Body>
          <Alert variant="danger" show={state.postError} onClose={dismissErrors} dismissible>
            <div>Oh snap! You got an error!</div>
          </Alert>
          <Form onSubmit={submitUser}>
            <Row>
              <Col sm={9}>
                <Form.Group className={'m-0'}>
                  <Form.Control
                    className={'border-0'}
                    value={state.userName}
                    onChange={updateUserName}
                    type="text"
                    placeholder="New user's name"/>
                </Form.Group>
              </Col>
              <Col sm={3} className={'text-right'}>
                <Button
                  onClick={submitUser}
                  disabled={!state.userName || state.isLoading}
                  variant="primary"
                  type="button">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <br/>
      <Alert variant="danger" show={state.deleteError} onClose={dismissErrors} dismissible>
        <div>Delete failed!</div>
      </Alert>
      <Card>
        <Card.Body><UsersList deleteHandler={showConfirmationDialog} users={state.users}/></Card.Body>
      </Card>
      <ConfirmModal
        show={state.showDeleteConfirmation}
        onHide={confirmDelete}
        confirmLabel={'Delete user'}
        bodyText={'Confirm user delete?'}
        buttonType={'danger'}
      />
    </div>
  );
}

export default AdminContainer;