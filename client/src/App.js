import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";
import Switch from "react-router-dom/Switch";

//check for token to keep logged in on page change or reload
const jwtToken = localStorage.jwtToken;

//does the jwt auth token exist in local storage?
if (jwtToken) {
	//set auth token header auth
	setAuthToken(jwtToken);
	//decode token and get user info and expiration
	const decoded = jwt_decode(jwtToken);
	//set user and is authenticated - call any action within the store (actions and reducers are linked)
	store.dispatch(setCurrentUser(decoded));

	//check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout user
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			//wrap the components which will use the store inside provider for later on state handling
			//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Switch.md
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/mylist" component={ShoppingList} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
