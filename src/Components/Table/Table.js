import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Table.css';
import { Link } from 'react-router-dom';

class UserTable extends React.Component { 

    constructor(props) {
        super(props);

        this.state = { 
            users: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => this.setState({
                ...this.state,
                users: users,
            }))
    }

    render() {   
      return (
        <Paper >
            <Table >
                <TableHead className='tableHeader'>
                    <TableRow>
                        <TableCell className='tableHeaderTh'>Name</TableCell>
                        <TableCell className='tableHeaderTh' align="left">Email</TableCell>
                        <TableCell className='tableHeaderTh' align="left">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {this.state.users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                            <Link to={`/users/${user.id}/posts`}> {user.name} </Link> </TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.address.city} ,{user.address.street}</TableCell>
                    </TableRow>

                ))}
                </TableBody>
            </Table>
        </Paper>);
    }
  }

export default UserTable;