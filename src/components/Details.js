import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

export class Details extends Component {
  state = {
    commentList: []
  };
  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${this.props.match.params.id}`
      );

      this.setState({
        commentList: res.data
      });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className='row justify-content-center'>
        {this.state.commentList.map(comment => (
          <Card
            border='primary'
            className='col-auto m-3 text-center shadow-sm'
            style={{ width: '18rem' }}
            key={comment.id}
          >
            <Card.Body>
              <Card.Text className='text-primary font-weight-bold'>
                {comment.name}
              </Card.Text>
              <Card.Text className='text-secondary'>{comment.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Details;
