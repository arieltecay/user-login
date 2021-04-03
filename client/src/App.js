import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Routing
import PrivateRoute from "./components/routings/PrivateRoute";

//Screen
import LoginScreen from "./components/screens/LoginScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";

function App() {
  return (
    <Router>
      <PrivateRoute exact path="/" component={PrivateScreen} />
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotPassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
