import { Switch, Route } from 'react-router-dom';
const Login = require("./pages/login").default;
const Result = require("./pages/result").default;
const HomePage = require("./pages/homepage").default;
const TestCollection = require("./pages/testCollection").default;
const PoolMapping = require("./pages/poolMapping").default;
const WellTesting = require("./pages/wellTesting").default;

const Routes = () => {
    return <Switch>
        <Route exact path="/">Index</Route>
        <Route exact path="/labtech" render={(props) => <Login labtech={true} {...props} />} />
        
        <Route exact path="/employee" render={(props) => <Login labtech={false} {...props} />} />
        <Route exact path="/employee/:userId" component={Result} />
        
        <Route exact path="/lab/:userId" component={HomePage} />
        <Route exact path="/collection/:userId" component={TestCollection} />
        <Route exact path="/pool/:userId" component={PoolMapping} />
        <Route exact path="/well/:userId" component={WellTesting}/>
    </Switch>
}

export default Routes;