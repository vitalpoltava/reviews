import React from 'react';
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

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userName: '',
      users: [],
      getError: false,
      postError: false,
      deleteError: false,
      showDeleteConfirmation: false,
      userDeleteId: false,
    };
  }

  updateUserName = (e) => {
    this.setState({userName: e.target.value});
  };

  serverActions = (type = 'get', payload = {}, id = '') => {
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
          type === 'get' && this.setState({users: result});
        }
      )
      .catch((error) => {
        if (type === 'get') {
          this.setState({getError: error});
        }
        if (type === 'post') {
          this.setState({postError: error});
        }
        if (type === 'delete') {
          this.setState({deleteError: error});
        }
      });
  };

  submitUser = (e) => {
    e.preventDefault();

    this.setState({isLoading: true});
    this.serverActions('post', {name: this.state.userName})
      .then(() => {
        this.setState({userName: ''});
        this.getUsers();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  deleteUser = (userId) => {
    this.setState({isLoading: true});
    this.serverActions('delete', {}, userId)
      .then(() => {
        this.getUsers();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  getUsers = () => this.serverActions();

  componentDidMount() {
    this.getUsers();
  }

  dismissErrors = () => {
    this.setState({getError: false, postError: false, deleteError: false});
  };

  showConfirmationDialog = (userId) => {
    this.setState({showDeleteConfirmation: true, userDeleteId: userId});
  };

  confirmDelete = (confirmed) => {
    this.setState({showDeleteConfirmation: false});

    if (confirmed) {
      return this.deleteUser(this.state.userDeleteId)
    }
  };

  render() {
    return (
      <div className='center30 admin-container'>
        <Card>
          <Card.Body>
            <Alert variant="danger" show={this.state.postError} onClose={this.dismissErrors} dismissible>
              <div>Oh snap! You got an error!</div>
            </Alert>
            <Form onSubmit={this.submitUser}>
              <Row>
                <Col sm={9}>
                  <Form.Group className={'m-0'}>
                    <Form.Control
                      className={'border-0'}
                      value={this.state.userName}
                      onChange={this.updateUserName}
                      type="text"
                      placeholder="New user's name"/>
                  </Form.Group>
                </Col>
                <Col sm={3} className={'text-right'}>
                  <Button
                    onClick={this.submitUser}
                    disabled={!this.state.userName || this.state.isLoading}
                    variant="primary"
                    type="button">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br/>
        <Alert variant="danger" show={this.state.deleteError} onClose={this.dismissErrors} dismissible>
          <div>Delete failed!</div>
        </Alert>
        <Card>
          <Card.Body><UsersList deleteHandler={this.showConfirmationDialog} users={this.state.users}/></Card.Body>
        </Card>
        <ConfirmModal
          show={this.state.showDeleteConfirmation}
          onHide={this.confirmDelete}
          confirmLabel={'Delete user'}
          bodyText={'Confirm user delete?'}
          buttonType={'danger'}
        />
      </div>
    );
  }
}

export default AdminContainer;