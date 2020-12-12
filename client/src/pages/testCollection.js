import React, { Component } from 'react';

class testCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: "",
            testBarcode: "",
            delete: "",
            tests: [],
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.add = async (e) => {
            // fetch to backend to add
            e.preventDefault();
            let body = {
                employeeID: this.state.employeeID,
                testBarcode: this.state.testBarcode,
                labID: this.props.match.params.userId
            }
            body = JSON.stringify(body);
            fetch("/api/testcollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => response.json())
            .then(data => this.setState({tests: data}));
        }

        this.delete = async () => {
            // fetch to backend to delete
            if (this.state.delete !== "") {
                let body = {
                    testBarcode: this.state.delete,
                }
                body = JSON.stringify(body);
                fetch("/api/testcollection", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                }).then(response => response.json())
                .then(data => this.setState({tests: data}));
                this.setState({delete: ""});
            }
        }

        this.getTests = async () => {
            // fetch to backend to get the tests in the table
            fetch("/api/testcollection")
                .then(response => response.json())
                .then(data => this.setState({tests: data}))
                .catch(error => console.log("error", error));

            // console.log("stuff", this.state.tests);
        }
    }
    
    componentDidMount() {
        this.getTests();
    }

    render() {
        return (
            <div>
                <h2>Test Collection</h2>
                <div>
                    <form onSubmit={e => this.add(e)}>
                        <div>
                            <label>Employee ID: </label>
                            <input type="text" name="employeeID" value={this.state.employeeID} onChange={e => this.onChange(e)} id="employeeID" required/>
                        </div>
                        <div>
                            <label>Test Barcode: </label>
                            <input type="text" name="testBarcode" value={this.state.testBarcode} onChange={e => this.onChange(e)} id="testBarcode" required/>
                        </div>
                        <button>Add</button>
                    </form>
                </div>
                <div>
                    <button onClick={this.getTests}>Update</button>
                    <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Test Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tests.map((row) => {
                                return (<tr key={row.testBarCode}>
                                    <td><input type="radio" name="delete" value={row.testBarCode} onChange={e => this.onChange(e)}></input>{row.employeeID}</td>
                                    <td>{row.testBarCode}</td>
                                </tr>)
                            })}
                        </tbody>        
                    </table>
                        <button onClick={this.delete}>Delete</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default testCollection;
