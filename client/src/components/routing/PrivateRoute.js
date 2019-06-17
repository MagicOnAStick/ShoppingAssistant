import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//...rest takes all other not explicitely declared params
//TODO add loading flag (see CodingTodos.txt)
const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated ? (
				<Redirect to="/login" /> //&& !loading
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

//pulls in all the state thats in the auth reducer
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
