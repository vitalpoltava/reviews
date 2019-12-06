import React from 'react';
import Button from 'react-bootstrap/Button';

function UsersList(props) {
  const deleteClick = (id) => {
    props.deleteHandler(id);
  };

  if (!props.users || !props.users.length) {
    return <div className={'bg-warning text-center p-2'}>{props.users.message || 'List is empty!'}</div>
  }
  return (
    <div>
      <div>
        <div className={'row mb-2 font-weight-bold'}>
          <div className={'col-8'}>Name</div>
          <div className={'col-4'}>&nbsp;</div>
        </div>
      </div>
      {props.users.map(function (user, index) {
        return (
          <div className={'row align-items-center mb-2'} key={user.id}>
            <div className={'col-8'}>{user.name}</div>
            <div className={'col-4 text-right'}>
              <Button variant={'outline-danger'} onClick={() => deleteClick(user.id)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default UsersList;