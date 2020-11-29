import Routes from './routes';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Link to="/labtech">Lab Tech Login </Link>
                <Link to="/employee">Employee Login </Link>
            </div>
            <Routes/>
        </Router>
    );
}

export default App;
