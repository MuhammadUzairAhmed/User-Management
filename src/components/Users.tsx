import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

interface IProps {
    users: User[],
    updateUser: (value: string) => void,
    deleteUser: (value: string) => void
}
interface User {
    _id: string,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string
}
interface IState {}

class Users extends Component<IProps, IState>
{
    //pass the clicked value to their parent
    editItem = (id: string) => {
        this.props.updateUser(id)
    }
    //pass the clicked value to their parent
    deleteItem = (id: string) => {
        this.props.deleteUser(id)
    }
    render() {
        const { users } = this.props;
        return (<div>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>Date of birth</th>
                        <th>Created at</th>
                        <th>Modified at</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* display list of users along with their data  */}
                    {users.map((item, index) => {
                        return <tr key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.dob}</td>
                            <td>{item.newAdded}</td>
                            <td>{item.lastModified}</td>
                            <th scope="row" ><Button color="primary" onClick={() => this.editItem(item._id)}>Edit</Button></th>
                            <th scope="row" ><Button color="danger" onClick={() => this.deleteItem(item._id)}>Delete</Button></th>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>)
    }
}


export default Users;