import React, { Component } from 'react';

class pollMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pool: "",
            testBarcodes: {"0": ""},
            nextNum: 1,
            table:  {}, 
            delete: ""
        }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }
        
        this.updateBarcodes = (e) => {
            let prev = { ...this.state.testBarcodes };
            prev[e.target.name] = e.target.value;
            this.setState({testBarcodes: prev})
        }
        
        this.addRow = () => {
            // add an extra row
            let prev = { ...this.state.testBarcodes };
            let newKey = ""+this.state.nextNum;
            prev[newKey] = "";
            this.setState({testBarcodes: prev});
            this.setState({nextNum: this.state.nextNum+1})
        }

        this.deleteRow = (e) => {
            let key = e.target.name;
            let prev = { ...this.state.testBarcodes };
            delete prev[key];
            this.setState({testBarcodes: prev})
        }

        this.submitPool = async (e) => {
            // submit pool 
            e.preventDefault();
            let body = {
                poolBarcode: this.state.pool,
                testBarcodes: this.state.testBarcode.join()
            }
            body = JSON.stringify(body);
            fetch("http://localhost:8000/api/testcollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then(response => response.json())
            .then(data => this.updateTable(data));
        }

        this.deletePool = async () => {
            // delete pool
            if (this.state.delete !== "") {
                let body = {
                    poolBarcode: this.state.delete,
                }
                body = JSON.stringify(body);
                fetch("http://localhost:8000/api/poolmapping", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                }).then(response => response.json())
                .then(data => this.updateTable(data));
                this.setState({delete: ""});
            }
        }

        this.getPools = async () => {
            // get pools 
            fetch("http://localhost:8000/api/poolmapping")
                .then(response => response.json())
                .then(data => this.updateTable(data));
        }

        this.updateTable = (array) => {
            // data is an array of dictionary -> convert to dictonary
            let updated = {};
            for (let i = 0; i < array.length; i++) {
                let row = array[i];
                if (row.poolBarcode in updated) {
                    updated[row.poolBarcode].push(row.testBarcode);
                } else {
                    updated[row.poolBarcode] = [row.testBarcode];
                }
            } 
            this.setState({table: updated})
        }
    }
    render() {
        return (
            <div>
                <h2>Pool Mapping</h2>
                <div>
                    <form onSubmit={e => this.submitPool(e)}>
                        <div>
                            <label>Pool barcode: </label>
                            <input type="text" name="pool" value={this.state.pool} onChange={e => this.onChange(e)} id="pool" required/>
                        </div>
                        <div>
                            <label>Test Barcode: </label>
                            <div>
                                {Object.keys(this.state.testBarcodes).map((key) => {
                                    return (
                                        <div key={key}>
                                            <input type="text" name={key} value={this.state.testBarcodes[key]} id={key} onChange={e => this.updateBarcodes(e)}required />
                                            <button name={key} onClick={this.deleteRow}>Delete</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <button onClick={this.addRow}>Add more rows</button>
                        </div>
                        <button>Submit Pool</button>
                    </form>
                </div>
                <div>
                    <button onClick={this.getPools}>Update</button>
                    <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Pool Barcode</th>
                                <th>Test Barcodes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.table).map((key) => {
                                return (<tr key={key}>
                                    <td><input type="radio" name="delete" value={key} onChange={e => this.onChange(e)}></input>{key}</td>
                                    <td>{this.state.table[key].join()}</td>
                                </tr>)
                            })}
                        </tbody>        
                    </table>
                        <button>Edit Pool</button>
                        <button onClick={this.delete}>Delete Pool</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default pollMapping;
