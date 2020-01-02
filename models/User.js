const mongoose = require('mongoose');

// Create MongoDB Schema for User --> ID is set automatically by MongoDB

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *     - name
 *     - latitude
 *     - longitude
 *     properties:
 *       name:
 *         type: string
 *         example: Julia
 *       points:
 *         type: number
 *       avatar:
 *         type: string
 *         example: 'https://api.adorable.io/avatars/111/juliagerstlacher.png'
 *       latitude:
 *         type: number
 *         example: 48.336886
 *       longitude:
 *         type: number
 *         example: 14.315338
 */

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	points: {
		type: Number,
		default: 0
	},
	avatar: {
		type: String
	},
	location: {
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		}
	}
});

module.exports = User = mongoose.model('user', UserSchema);
