import React, { Component } from 'react';

class testCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: "",
            testBarcode: "",
            tests: [],
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.add = (e) => {
            e.preventDefault();
            console.log(this.props);
            let body = {
                employeeID: this.state.employeeID,
                testBarcode: this.state.testBarcode,
                labID: this.props.match.params.userId
            }
            body = JSON.stringify(body);
            fetch("http://localhost:8000/api/testcollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => {
                console.log(response);
            });
            // fetch to backend to add
        }

        this.delete = (e) => {
            e.preventDefault();
            // fetch to backend to delete
        }

        this.getTests = () => {
            // fetch to backend to get the tests in the table
            fetch("http://localhost:8000/api/testcollection")
                .then(response => response.json())
                .then(data => this.setState({tests: data}));

            console.log(this.state.tests);
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
                                    <td>{row.employeeID}</td>
                                    <td>{row.testBarCode}</td>
                                </tr>)
                            })}
                        </tbody>        
                    </table>
                    </center>
                </div>
            </div>
        );
    }
}

export default testCollection;
