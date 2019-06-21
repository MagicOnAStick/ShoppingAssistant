import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	createOrUpdateProfile,
	getCurrentProfile
} from "../../actions/profileActions";
import Select from "react-select";

//add the props mapped from state as params
class EditProfile extends Component {
	constructor() {
		super();
		this.state = {
			interests: [],
			location: "",
			status: "",
			bio: "",
			youtube: "",
			facebook: "",
			instagram: "",
			displaySocialInputs: true
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		//useEffect(() => {
		getCurrentProfile();

		this.setState({
			interests: loading || !profile.interests ? "" : profile.interests,
			location: loading || !profile.location ? "" : profile.location,
			status: loading || !profile.status ? "" : profile.status,
			bio: loading || !profile.bio ? "" : profile.bio,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram
		});
		//}, [loading]); //run this effect while loading
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		createOrUpdateProfile(this.state, history);
	};

	render() {
		const interestOptions = [
			{ value: "lose_weight", label: "Lose Weight" },
			{ value: "gain_weight", label: "Gain Weight" },
			{ value: "keep_weight", label: "keep_weight" },
			{ value: "gain_muscle", label: "Gain Muscle" }
		];

		return (
			<Fragment>
				<h1 className="large text-primary">Create Your Profile</h1>
				<p className="lead">
					<i className="fas fa-user" /> Let's do some information to make your
					profile stand out
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={e => this.onSubmit(e)}>
					<div className="form-group">
						<Select
							isMulti
							name="interests"
							options={interestOptions}
							value={this.state.interests}
							onChange={e => this.onChange(e)}
							className="basic-multi-select"
							classNamePrefix="multi-select"
						/>
						<select
							multiple
							name="status"
							value={this.state.status}
							onChange={e => this.onChange(e)}
						>
							<option value="0">* Select Experience Status</option>
							<option value="Beginner">Beginner</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Pro">Pro</option>
							<option value="Body Builder">Body Builder</option>
							<option value="Influencer / Model">Influencer / Model</option>
							<option value="Other">Other</option>
						</select>
						<small className="form-text">
							What are the things you are interested in the most, fitness wise?
						</small>
						<select
							name="status"
							value={this.state.status}
							onChange={e => this.onChange(e)}
						>
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
							value={this.state.location}
							onChange={e => this.onChange(e)}
						/>
						<small className="form-text">
							City & state suggested (eg. Boston, MA)
						</small>
					</div>
					<div className="form-group">
						<textarea
							placeholder="A short bio of yourself"
							name="bio"
							value={this.state.bio}
							onChange={e => this.onChange(e)}
						/>
						<small className="form-text">
							Tell us a little about your story
						</small>
					</div>
					<div className="my-2">
						<button
							onClick={e => (this.state.displaySocialInputs = !e.target.value)}
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
									value={this.state.facebook}
									onChange={e => this.onChange(e)}
								/>
							</div>
							<div className="form-group social-input">
								<i className="fab fa-youtube fa-2x" />
								<input
									type="text"
									placeholder="YouTube URL"
									name="youtube"
									value={this.state.youtube}
									onChange={e => this.onChange(e)}
								/>
							</div>
							<div className="form-group social-input">
								<i className="fab fa-instagram fa-2x" />
								<input
									type="text"
									placeholder="Instagram URL"
									name="instagram"
									value={this.state.instagram}
									onChange={e => this.onChange(e)}
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
	}
}

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
