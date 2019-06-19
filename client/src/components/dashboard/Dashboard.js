import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import Spinner from "../layout/Spinner";

const Dashboard = ({
	getCurrentProfile,
	auth,
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="display-4 text-center">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" />
				Welcome {auth.user && auth.user.name}
			</p>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

//stackoverflow.com/questions/46276810/what-is-the-necessity-of-export-default-connect-when-you-are-connecting-your-r
export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);
