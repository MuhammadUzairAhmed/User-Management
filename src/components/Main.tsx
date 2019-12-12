import React, { Component } from 'react';
import Users from './Users';
import Ceateuser from './Ceateuser';
import Update from './Update';

interface IState {
    allusers: [],
    updateUser: User,
    openForm: boolean,
    refList: boolean
}
interface User {
    _id: string,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string
}
interface IProps {}

class Main extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            allusers: [],
            updateUser: {
                _id: '',
                name: '',
                dob: '',
                email: '',
                newAdded: '',
                lastModified: ''
            },
            openForm: false,
            refList: false
        }

    }
    componentDidMount() {
        //this function is used to display list of data
        this.getUsers();
    }
    //this function will be called after succesfully update the data.
    refreshUser = (value: boolean) => {
        if (value) {
            this.setState({ refList: true }, () => {
                this.setState({ openForm: false }, () => {
                    this.getUsers()
                })

            })
        }
    }
    //this function fetch the list of users
    getUsers = () => {
        fetch('http://localhost:3002/users')
            .then(res => res.json())
            .then(data => {
                this.setState({ allusers: data })
            })
    }
    //this function is used to update the user
    updatedUser = (id: string) => {
        fetch(`http://localhost:3002/user/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ updateUser: data, openForm: true })
            })
    }
    //this functon is used to delete the user
    deletedUser = (id: string) => {
        fetch(`http://localhost:3002/user/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (res.status == 200) {
                    this.getUsers()
                }
            })
    }

    render() {
        const { allusers, updateUser, openForm } = this.state;
        return (
            <div>
                {/* this component is used to display list of users  and delete specific user*/}
                <Users users={allusers} updateUser={this.updatedUser} deleteUser={this.deletedUser} />
                {/* this component is used to update user */}
                <Update dispModal={openForm} getUser={updateUser} refreshList={this.refreshUser} cehckUser={allusers}/>
                {/* this component is used to create new user */}
                <Ceateuser cehckUser={allusers} refreshList={this.refreshUser} />
            </div>
        )
    }
}

export default Main;