import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

export class PostList extends Component {
  state = {
    postList: [],
    commentNbr: []
  };
  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.props.match.params.id}`
      );

      this.setState({
        postList: res.data
      });

      //Comment number
      for (let post of this.state.postList) {
        let res = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );

        this.setState({
          commentNbr: [...this.state.commentNbr, res.data.length]
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className='row justify-content-center'>
        {this.state.postList.map((post, index) => (
          <Card
            border='primary'
            className='col-auto m-3 text-center shadow-sm'
            style={{ width: '18rem' }}
            key={post.id}
          >
            <Card.Body className='d-flex flex-column justify-content-between'>
              <Card.Text className='text-primary font-weight-bold'>
                {post.title}
              </Card.Text>
              <Card.Text className='text-secondary'>{post.body}</Card.Text>
              <Card.Text className='d-flex flex-column justify-content-between align-items-center'>
                <Badge pill variant='danger' className='mb-2'>
                  {this.state.commentNbr[index]} Comments
                </Badge>

                <Link to={`/details/${post.id}`}>
                  <Button variant='info'>Details</Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default PostList;
