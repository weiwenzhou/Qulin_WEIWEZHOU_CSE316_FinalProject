import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <h2>Lab Home</h2>
                <div>
                    <Link to="/collection/1">Test Collection</Link>
                </div>
                <div>
                    <Link to="/pool/1">Pool Mapping</Link>
                </div>
                <div>
                    <Link to="/well/1">Well Testing</Link>
                </div>
            </div>
        );
    }
}
export default Homepage;
