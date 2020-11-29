import React, { Component } from 'react';

const AuthForm = require('../components/authenticationForm').default;

class Login extends Component {
    render() {
        return (
            <div>
                <AuthForm action={this.props.labtech ? "LabTech Login Page": "Employee Login Page"} parent = {this.props}/>
            </div>
        );
    }
}

export default Login;
