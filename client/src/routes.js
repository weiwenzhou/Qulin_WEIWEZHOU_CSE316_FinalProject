import { Switch, Route } from 'react-router-dom';
const Login = require("./pages/login").default;

const Routes = () => {
    return <Switch>
        <Route exact path="/">Index</Route>
        <Route exact path="/labtech" component={Login} />
        
        <Route exact path="/employee">Employee login page</Route>
        <Route exact path="/employee/:userId">Showing homepage for employee</Route>
        <Route exact path="/collection/:userId">Test Collection page for employee </Route>
        
        <Route exact path="/lab/:userId">Lab Home page for employee</Route>
        <Route exact path="/pool/:userId">Pool Mapping page for employee</Route>
        <Route exact path="/well/:userId">Well Testing page for employee</Route>
    </Switch>
}

export default Routes;