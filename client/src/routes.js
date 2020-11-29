import { Switch, Route } from 'react-router-dom';
const Login = require("./pages/login").default;
const HomePage = require("./pages/homepage").default;
const TestCollection = require("./pages/testCollection").default;

const Routes = () => {
    return <Switch>
        <Route exact path="/">Index</Route>
        <Route exact path="/labtech" render={(props) => <Login labtech={true} {...props} />} />
        
        <Route exact path="/employee" render={(props) => <Login labtech={false} {...props} />} />
        <Route exact path="/employee/:userId">Showing homepage for employee</Route>
        
        <Route exact path="/lab/:userId" component={HomePage} />
        <Route exact path="/collection/:userId" component={TestCollection} />
        <Route exact path="/pool/:userId">Pool Mapping page for employee</Route>
        <Route exact path="/well/:userId">Well Testing page for employee</Route>
    </Switch>
}

export default Routes;