import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="landing">
			<div className="dark-overlay landing-inner text-light">
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1 className="display-4 mb-4">ShoppingList</h1>
							<p className="lead">
								{" "}
								Create ShoppingLists easily on any device and use them comfy
								while shopping without any paperlists.
							</p>
							<hr />
							<Link to="/register" className="btn btn-lg btn-info mr-2">
								Sign Up
							</Link>
							<Link to="/login" className="btn btn-lg btn-light">
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
