import React, { Component } from 'react';
import { Spinner, Row, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IProps {
    dispModal: boolean,
    getUser: User,
    refreshList: (value: boolean) => void,
}
interface User {
    _id: string,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string
}
interface IState {
    showModal: boolean,
    name: string,
    dob: string,
    email: string,
    newAdded: string,
    lastModified: string,
    dispSpinner: boolean
}

class Update extends Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            dob: '',
            email: '',
            newAdded: '',
            lastModified: '',
            dispSpinner: false
        }
    }
    //this is used to set the updated props into the state.
    componentWillReceiveProps(nextprops: any) {
        this.setState({
            showModal: nextprops.dispModal,
            name: nextprops.getUser.name,
            dob: nextprops.getUser.dob,
            email: nextprops.getUser.email
        })
    }
    //this function is used to display and hide the form.
    toggle = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    submitData = () => {
        //disSpinner is used as a loader dring API call
        this.setState({ dispSpinner: true })
        //the below code is used to set the modified date of project
        var today = new Date();
        var cDate = today.getDate();
        var cMonth = today.getMonth();
        var cYear = today.getFullYear();
        var modifiedDate = cDate + '-' + cMonth + '-' + cYear;
        //below is all the states that are set by form. 
        const { name, dob, email, newAdded, lastModified } = this.state
        //it is used to  set the values to pass in the API
        const values = {name, dob, email, newAdded, lastModified: modifiedDate};
        //New user created API
        fetch(`http://localhost:3002/user/${this.props.getUser._id}`
            , {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.status == 200) {
                    //if succesfully inserted then loader and form will be hidden. 
                    this.setState({ showModal: false, dispSpinner: false })
                    //after successfully insert the data then the list will be refresh to show updated data.
                    this.props.refreshList(true)
                }
            })

    }
    render() {
        const { showModal, name, dob, email, dispSpinner } = this.state;

        return (<div>
            {/* loader */}
            {dispSpinner && <Spinner style={{ width: '3rem', height: '3rem' }} />}
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
                                <Input type="text" name="dob" id="dob" value={dob} onChange={e => this.setState({ dob: e.target.value })} placeholder="23-11-1994" />
                            </FormGroup>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitData}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>)
    }
}


export default Update;