import React from 'react';
import Button from "react-bootstrap/Button";

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteClick = (id) => {
    this.props.deleteHandler(id);
  };

  render() {
    const that = this;
    const items = this.props.list || [];

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
                <Button variant={'outline-danger'} onClick={that.deleteClick.bind(this, item.id)}>Delete</Button>
              </div>
            </div>;
        })}
      </div>
    )
  }
}

export default ReviewsList;