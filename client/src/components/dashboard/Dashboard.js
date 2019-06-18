import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	return <div>Dashboard</div>;
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
