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
            let body = JSON.stringify(this.state);
            if (this.props.action !== "LabTech Login Page") {
                body = body.replace("id", "email");
            }
            fetch("/api"+((this.props.action === "LabTech Login Page") ? "/labtech":"/employee"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => {
                if (response.status === 200) {
                    if (this.props.action === "LabTech Login Page") {
                        this.props.parent.history.push("/lab/"+this.state.id);
                    } else {
                        this.props.parent.history.push("/employee/"+this.state.id);
                    }
                } else {
                    alert("Invalid username or password.");
                    this.setState({"id":""});
                    this.setState({"password":""});
                }
            });
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
                    <label>{this.props.action === "LabTech Login Page" ? "Lab ID: ":"Email: "}</label>
                    <input type="text" name="id" value={this.state.id} onChange={e => this.updateForm(e)} id="id" required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.updateForm(e)} id="password" required/>
                </div>
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default authenticationForm;
