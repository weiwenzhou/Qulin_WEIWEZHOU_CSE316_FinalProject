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
            edit: false,
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }

        this.edit = () => {
            // when edit button is clicked
            if (this.state.delete !== "") {
                this.setState({edit: true});
                // set wellBarcode/poolBarcode/result to match row 
                // wellBarcode = delete
                for (let i = 0; i < this.state.wells.length; i++) {
                    let well = this.state.wells[i];
                    if (well.wellBarcode === this.state.delete) {
                        this.setState({wellBarcode: well.wellBarcode})
                        this.setState({poolBarcode: well.poolBarcode})
                        this.setState({result: well.result})
                    }
                }
            }
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
            fetch("/api/welltesting", {
                method: this.state.edit ? "PUT":"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => response.json())
            .then(data => this.setState({wells: data}));
            if (this.state.edit) {
                this.setState({edit: false});
            }
        }

        this.delete = async () => {
            // fetch to backend to delete
            if (this.state.delete !== "") {
                let body = {
                    wellBarcode: this.state.delete,
                }
                body = JSON.stringify(body);
                fetch("/api/welltesting", {
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
            fetch("/api/welltesting")
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
                <h2>Well Testing</h2>
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
                        <button>{this.state.edit ? "Edit":"Add"}</button>
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
                        <button onClick={this.edit}>Edit Button</button>
                        <button onClick={this.delete}>Delete</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default wellTesting;
