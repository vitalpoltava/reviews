import React from 'react';
import Button from "react-bootstrap/Button";
function ReviewsList(props) {
  const items = props.list || [];

  const deleteClick = (id) => {
    props.deleteHandler(id);
  };

  return (
    <div>
      <div>
        <div className={'row mb-2 font-weight-bold'}>
          <div className={'col-6'}>Title</div>
          <div className={'col-4'}>For user</div>
          <div className={'col-2'}>&nbsp;</div>
        </div>
      </div>
      {items.map(function (item, index) {
        return <div className={'row align-items-center mb-2'} key={item.id}>
          <div className={'col-6'}>{item.name}</div>
          <div className={'col-4'}>{item.reviewedUser}</div>
          <div className={'col-2'}>
            <Button variant={'outline-danger'} onClick={deleteClick.bind(this, item.id)}>Delete</Button>
          </div>
        </div>;
      })}
    </div>
  )
}

export default ReviewsList;