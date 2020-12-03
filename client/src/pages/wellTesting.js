import React, { Component } from 'react';

class wellTesting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wellBarcode: "",
            poolBarcode: "",
            result: "in progress",
            delete: "",
            wells: [],
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.add = async (e) => {
            // fetch to backend to add
            e.preventDefault();
            let body = {
                wellBarcode: this.state.wellBarcode,
                poolBarcode: this.state.poolBarcode,
                result: this.state.result
            }
            body = JSON.stringify(body);
            fetch("http://localhost:8000/api/welltesting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => response.json())
            .then(data => this.setState({wells: data}));
        }

        this.delete = async () => {
            // fetch to backend to delete
            if (this.state.delete !== "") {
                let body = {
                    wellBarcode: this.state.delete,
                }
                body = JSON.stringify(body);
                fetch("http://localhost:8000/api/welltesting", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                }).then(response => response.json())
                .then(data => this.setState({wells: data}));
                this.setState({delete: ""});
            }
        }

        this.getWells = async () => {
            // fetch to backend to get the tests in the table
            fetch("http://localhost:8000/api/welltesting")
                .then(response => response.json())
                .then(data => this.setState({wells: data}));

            // console.log("stuff", this.state.tests);
        }
    }
    
    componentDidMount() {
        this.getWells();
    }

    render() {
        return (
            <div>
                <h2>Test Collection</h2>
                <div>
                    <form onSubmit={e => this.add(e)}>
                        <div>
                            <label>Well Barcode: </label>
                            <input type="text" name="wellBarcode" value={this.state.wellBarcode} onChange={e => this.onChange(e)} id="wellBarcode" required/>
                        </div>
                        <div>
                            <label>Pool Barcode: </label>
                            <input type="text" name="poolBarcode" value={this.state.poolBarcode} onChange={e => this.onChange(e)} id="poolBarcode" required/>
                        </div>
                        <div>
                            <label>Results: </label>
                            <select name="result" value={this.state.result} onChange={e => this.onChange(e)}>
                            <option value="in progress">in progress</option>
                            <option value="negative">negative</option>
                            <option value="positive">positive</option>
                            </select>
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
                                <th>Well barcode</th>
                                <th>Pool barcode</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.wells.map((row) => {
                                return (<tr key={row.wellBarcode}>
                                    <td><input type="radio" name="delete" value={row.wellBarcode} onChange={e => this.onChange(e)}></input>{row.wellBarcode}</td>
                                    <td>{row.poolBarcode}</td>
                                    <td>{row.result}</td>
                                </tr>)
                            })}
                        </tbody>        
                    </table>
                        <button>Edit Button</button>
                        <button onClick={this.delete}>Delete</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default wellTesting;
