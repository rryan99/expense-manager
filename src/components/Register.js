import axios from 'axios';
import React, { Component } from 'react';

export default class Register extends Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            fname: '',
            lname: '',
            password: ''
        }
    }

    onChangeEmail(e){
        this.setState({ email: e.target.value });
    }
    onChangeFname(e){
        this.setState({ fname: e.target.value });
    }
    onChangeLname(e){
        this.setState({ lname: e.target.value});
    }
    onChangePassword(e){
        this.setState({ password: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            fname: this.state.fname,
            lname: this.state.lname,
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        window.location = '/';    
    }

    render(){
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Name: </label>
                        <div className='row'>
                            <div className='col'>
                                <input type='text' required className='form-control' placeholder='First name' value={this.state.fname} onChange={this.onChangeFname}/>
                            </div>
                            <div className='col'>
                                <input type='text' required className='form-control' placeholder='Last name' value={this.state.lname} onChange={this.onChangeLname}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input type='text' required className='form-control' value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className='form-group'>
                        <label>Password: </label>
                        <input type='password' required className='form-control' value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Register' className='btn btn-dark'/>
                    </div>
                </form>
            </div>
        )
    }
}