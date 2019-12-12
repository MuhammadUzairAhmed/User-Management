import React, { Component } from 'react';
import { Spinner, Row, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IProps {
    refreshList: (value: boolean) => void,
    cehckUser: User[],
}
interface IState {
    showModal: boolean,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string,
    dispSpinner: boolean,
    err: boolean
}
interface User {
    _id: string,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string
}

class Ceateuser extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            dob: '',
            email: '',
            newAdded: '',
            lastModified: '',
            dispSpinner: false,
            err: false
        }
    }
    //this function is used to display and hide the form.
    toggle = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    //unique username checker
    ValidateUsername = (name: string) => {
        let checkUser = this.props.cehckUser.find((item) => {
            if (item.name == name) {
                return item.name
            }
        });
        return checkUser
    }
    //email validation checker
    ValidateEmail = (mail: string) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
       return (false)
    }
    submitData = () => {
        //disSpinner is used as a loader dring API call
        this.setState({ dispSpinner: true, err: false })
        //the below code is used to set the created date of project
        var today = new Date();
        var cDate = today.getDate();
        var cMonth = today.getMonth() + 1;
        var cYear = today.getFullYear();
        var modifiedDate = cYear + '-' + cMonth + '-' + cDate;
        //below is all the states that are set by form. 
        const { name, dob, email, lastModified } = this.state
        //it is used to  set the values to pass in the API
        const values = { name, dob, email, newAdded: modifiedDate, lastModified };

        //if the email is valid and username is unique then process will continue
        if (this.ValidateEmail(email) && this.ValidateUsername(name) == undefined && name !== '') {
            //New user created API
            fetch(`http://localhost:3002/user`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                }).then(res => {
                    if (res.status == 200) {
                        setTimeout(() => {
                            //if succesfully inserted then loader and form will be hidden. 
                            this.setState({ showModal: false, dispSpinner: false })
                        }, 800)
                        //after successfully insert the data then the list will be refresh to show updated data.
                        this.props.refreshList(true)
                        this.setState({ name: '', dob: '', email: '', lastModified: '' })
                    } else { alert('something went wrong') }
                })
        } else {
            this.setState({ err: true })
            setTimeout(() => {
                this.setState({ showModal: false, dispSpinner: false, err: false })
            }, 1000)
        }
    }
    render() {
        const { dispSpinner, showModal, name, dob, email, err } = this.state;
        console.log(dob, 'chekcDob')
        return (
            <div>
                {/* loader */}
                {dispSpinner &&
                    <Modal isOpen={true}  >
                        <ModalBody>
                            <Form>
                                <Row>
                                    <FormGroup>
                                        {err === true ? <Label for="username" style={{ color: 'red', marginLeft: '20px' }}>Username should be unique and email should be valid</Label> : null}
                                        <Spinner style={{ width: '3rem', height: '3rem', marginLeft: '200px' }} />
                                    </FormGroup>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>}
                {/* user form */}
                <Modal isOpen={showModal} toggle={this.toggle}  >
                    <ModalHeader>Update User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="name" id="name" value={name} onChange={e => this.setState({ name: e.target.value })} placeholder="uzair" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="text" name="email" id="email" value={email} onChange={e => this.setState({ email: e.target.value })} placeholder="uzair@gmail.com" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dob">Date Of Birth</Label>
                                    <Input type="date" name="dob" id="dob" value={dob} onChange={e => this.setState({ dob: e.target.value })} placeholder="23-11-1994" />
                                </FormGroup>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitData}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                {/* button to open form */}
                <Button color="info" onClick={this.toggle}>Create New User</Button>
            </div>
        )
    }
}

export default Ceateuser;