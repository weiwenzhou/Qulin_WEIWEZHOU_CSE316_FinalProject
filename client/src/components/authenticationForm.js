import React, { Component, useState} from 'react';

class authenticationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            password:""
        };

        this.updateForm = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.submit = (e) => {
            e.preventDefault();
            fetch("/labtech")
            .then(response => response.json())
            .then(data => console.log(data));
        };
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.submit(e)}>
                <label>Lab ID:</label>
                <input type="text" name="id" value={this.state.id} onChange={e => this.updateForm(e)} id="id" required/>
                <label>Password:</label>
                <input type="password" name="password" value={this.state.password} onChange={e => this.updateForm(e)} id="password" required/>
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default authenticationForm;
