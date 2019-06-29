import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		interests: [],
		location: "",
		status: "",
		bio: "",
		youtube: "",
		facebook: "",
		instagram: ""
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	//make fields from formData / State accessible
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
		createProfile(formData, history);
	};

	const selectOnInputChange = (value, action) => {
		switch (action.action) {
			case "select-option":
				setFormData({ ...formData, interests: [] });
				value.forEach(item => {
					setFormData({ ...formData, interests: [interests, item] });
				});
				return;
			case "clear":
				this.setState({ interests: [] });
				return;
			default:
				return;
		}
	};

	const interestOptions = [
		{ value: "lose_weight", label: "Lose Weight" },
		{ value: "gain_weight", label: "Gain Weight" },
		{ value: "keep_weight", label: "Keep my Weight" },
		{ value: "gain_muscle", label: "Gain more Muscle" }
	];

	return (
		<Fragment>
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user" /> Let's get some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<Select
						isMulti
						name="interests"
						options={interestOptions}
						value={interests}
						onChange={selectOnInputChange}
						className="basic-multi-select"
						classNamePrefix="multi-select"
					/>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<select name="status" value={status} onChange={e => this.onChange(e)}>
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
						placeholder="Website"
						name="website"
						value={website}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">
						Could be your own or a company website
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
					<small className="form-text">Tell us a little about yourself</small>
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
	createProfile: PropTypes.func.isRequired
};
export default connect(
	null,
	{ createProfile }
)(withRouter(CreateProfile));
