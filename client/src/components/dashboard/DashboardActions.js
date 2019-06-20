import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
	return (
		<div class="dash-buttons">
			<Link to="/edit-profile" class="btn btn-light">
				<i class="fas fa-user-circle text-primary" /> Edit Profile
			</Link>
			<Link to="/add-experience" class="btn btn-light">
				<i class="fab fa-black-tie text-primary" /> Add or Edit Experience
			</Link>
			<Link to="/add-weekplan" class="btn btn-light">
				<i class="fas fa-graduation-cap text-primary" /> Add or Edit Weekplan
			</Link>
		</div>
	);
};

export default DashboardActions;
