import axios from 'axios';
import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            loginError: '',
            loginAttempted: false
        }
    }

    onChangeEmail(e){
        this.setState({ email: e.target.value });
    }
    onChangePassword(e){
        this.setState({ password: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                //incorrect login
                if(res.status === 204){
                    this.setState({
                        loginError: 'Incorrect credentials.',
                        loginAttempted: true
                    })
                }
                else{
                    window.location = '/';
                }
            })
    }

    render(){
        return (
            <div>
                <h2>Login</h2>
                    {
                        (this.state.loginError) ? (<div className='alert alert-danger'>{this.state.loginError}</div>) : null
                    }
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input type='text' required className='form-control' value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className='form-group'>
                        <label>Password: </label>
                        <input type='password' required className='form-control' value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Login' className='btn btn-dark'/>
                    </div>
                </form>
            </div>
        )
    }
}