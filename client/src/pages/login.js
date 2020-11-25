import React, { Component } from 'react';

const AuthForm = require('../components/authenticationForm').default;

class login extends Component {
    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <AuthForm />
            </div>
        );
    }
}

export default login;
