import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }

        this.getResults = () => {
            // fetch for the results for the user
            fetch("http://localhost:8000/api/employee_results?employeeID="+this.props.match.params.userId)
                .then(response => response.json())
                .then(data => this.setState({results: data}));
        }
    }
    
    componentDidMount() {
        this.getResults();
    }

    render() {
        return (
            <div>
                <h2> Employee Home </h2>
                <div>
                    <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Collection Date</th>
                                <th>Result </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((row) => {
                                return (<tr>
                                    <td>{row.collectionTime}</td>
                                    <td>{row.result}</td>
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

export default Result;
