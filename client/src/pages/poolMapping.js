import React, { Component } from 'react';

class pollMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pool: "",
            testBarcodes: {"0": ""},
            nextNum: 1,
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
    }
    render() {
        return (
            <div>
                <h2>Pool Mapping</h2>
                <div>
                    <form onSubmit={e => this.add(e)}>
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
                                            <input type="text" name={key} value={this.state.testBarcodes.key} id={key} onChange={e => this.updateBarcodes(e)}required />
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
                    <button onClick={this.getTests}>Update</button>
                    <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Pool Barcode</th>
                                <th>Test Barcodes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.state.tests.map((row) => {
                                return (<tr key={row.testBarCode}>
                                    <td><input type="radio" name="delete" value={row.testBarCode} onChange={e => this.onChange(e)}></input>{row.employeeID}</td>
                                    <td>{row.testBarCode}</td>
                                </tr>)
                            })} */}
                        </tbody>        
                    </table>
                        <button onClick={this.delete}>Delete Pool</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default pollMapping;
