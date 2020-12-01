import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <h2>Lab Home</h2>
                <div>
                    <Link to={"/collection/"+this.props.match.params.userId}>Test Collection</Link>
                </div>
                <div>
                    <Link to={"/pool/"+this.props.match.params.userId}>Pool Mapping</Link>
                </div>
                <div>
                    <Link to={"/well/"+this.props.match.params.userId}>Well Testing</Link>
                </div>
            </div>
        );
    }
}
export default Homepage;
