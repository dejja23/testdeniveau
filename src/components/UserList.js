import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class UserList extends Component {
  state = {
    userList: []
  };
  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');

      this.setState({
        userList: res.data
      });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className='row justify-content-center'>
        {this.state.userList.map(user => (
          <Card
            border='primary'
            className='col-auto m-3 text-center shadow-sm '
            style={{ width: '18rem' }}
            key={user.id}
          >
            <Card.Body className='d-flex flex-column'>
              <Card.Text className='text-primary font-weight-bold'>
                {user.name}
              </Card.Text>
              <Card.Text className='text-secondary'>{user.website}</Card.Text>
              <Card.Text className='text-secondary'>{user.email}</Card.Text>
              <Link to={`/posts/${user.id}`}>
                <Button variant='info'>Posts</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default UserList;
