import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	createOrUpdateProfile,
	getCurrentProfile
} from "../../actions/profileActions";

//add the props mapped from state as params
const EditProfile = ({
	profile: { profile, loading },
	createOrUpdateProfile,
	getCurrentProfile,
	history
}) => {
	const [formData, setFormData] = useState({
		interests: "",
		location: "",
		status: "",
		bio: "",
		youtube: "",
		facebook: "",
		instagram: ""
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			interests: loading || !profile.interests ? "" : profile.interests,
			location: loading || !profile.location ? "" : profile.location,
			status: loading || !profile.status ? "" : profile.status,
			bio: loading || !profile.bio ? "" : profile.bio,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram
		});
	}, [loading]); //run this effect while loading

	const {
		interests,
		location,
		status,
		bio,
		youtube,
		facebook,
		instagram
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		createOrUpdateProfile(formData, history);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user" /> Let's do some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<select name="status" value={status} onChange={e => onChange(e)}>
						<option value="0">* Select Experience Status</option>
						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Pro">Pro</option>
						<option value="Body Builder">Body Builder</option>
						<option value="Influencer / Model">Influencer / Model</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give an idea of where you are at in your fitness way of living
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">Tell us a little about your story</small>
				</div>
				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type="button"
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x" />
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x" />
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x" />
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</div>
					</Fragment>
				)}
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};
CreateProfile.propTypes = {
	createOrUpdateProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

//bring in the state from profilereducer
const mapStateToProps = state => ({
	profile: state.profile
});

//why do the used methods from the actions need to be passed here? For Component init maybe?
export default connect(
	mapStateToProps,
	{ createOrUpdateProfile, getCurrentProfile }
)(withRouter(EditProfile));
