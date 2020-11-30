import React, { Component } from 'react';

class testCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: "",
            testBarcode: "",
            tests: [{employeeID: 111, testBarcode: 123}],
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.add = (e) => {
            e.preventDefault();
            // fetch to backend to add
        }

        this.delete = (e) => {
            e.preventDefault();
            // fetch to backend to delete
        }

        this.getTests = () => {
            // fetch to backend to get the tests in the table
        }

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
                                return (<tr key={row.testBarcode}>
                                    <td>{row.employeeID}</td>
                                    <td>{row.testBarcode}</td>
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
