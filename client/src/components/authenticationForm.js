import React, { Component } from 'react';

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
            // fetch("http://localhost:8000/api/employee", {
            //     method: "POST",
            //     body: this.state
            // }).then(response => {
            //     console.log(response);
            // }).then(data => console.log(data));
            if (this.props.action === "LabTech Login Page") {
                this.props.parent.history.push("/lab/1");
            } else {
                this.props.parent.history.push("/employee/1");
            }
        };
    }

    render() {
        return (
            <div>
                <div>
                    <h2>{this.props.action}</h2>
                </div>
                <form onSubmit={e => this.submit(e)}>
                <div>
                    <label>Lab ID :</label>
                    <input type="text" name="id" value={this.state.id} onChange={e => this.updateForm(e)} id="id" required/>
                </div>
                <div>
                    <label>Password :</label>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.updateForm(e)} id="password" required/>
                </div>
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default authenticationForm;
