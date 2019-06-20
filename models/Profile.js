const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		//collection to refer
		ref: "users"
	},
	//for seo friendly url
	handle: {
		type: String,
		required: true,
		max: 40
	},
	interests: {
		type: [String]
	},
	location: {
		type: String
	},
	status: {
		type: String
	},
	achievements: [
		{
			type: Schema.Types.ObjectId,
			ref: "achievement"
		}
	],
	current_weekplan: {
		type: Schema.Types.ObjectId,
		ref: "week"
	},
	bio: {
		type: String
	},
	social: {
		youtube: {
			type: String
		},
		facebook: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	},

	experience: [
		{
			description: {
				type: String
			},
			from: {
				type: Date,
				required: true
			},
			until: {
				type: Date
			}
		}
	]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
