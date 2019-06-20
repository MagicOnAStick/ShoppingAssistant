import axios from "axios";
import { setAlert } from "./alert";
import {
	GET_PROFILE,
	PROFILE_LOADING,
	PROFILE_ERROR,
	CLEAR_CURRENT_PROFILE
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				//return empty profile
				type: GET_PROFILE,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		);
};

// Create or update profile
export const createOrUpdateProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.post("/api/profile", formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Profile Loading
//just informs the reducer that the profile is loading - no payload / data required
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
