const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/authMiddleware');
const User = require('../../models/User');

// TODO needs to be eliminated after location fetching is implemented in the frontend
router.post(
	'/user',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name } = req.body;

		try {
			// See if user name exists
			let user = await User.findOne({ name });

			if (user) {
				return res.status(400).json({
					errors: [
						{ msg: 'User already exists, please choose another user name' }
					]
				});
			}

			// Fill user object fields
			const userFields = {};
			userFields.name = name;
			userFields.avatar = `/myAvatars/100/${name}`;
			userFields.location = {};
			userFields.location.latitude = 14;
			userFields.location.longitude = 12;

			// Create a new user
			user = new User(userFields);

			// save user to DB
			await user.save();

			// Return jsonwebtoken (change expires to 3600)
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Internal server error' });
		}
	}
);

/**
 *@swagger
 * path:
 *  /api/users/:
 *    post:
 *      tags:
 *        - users
 *      summary: Register a new user
 *      parameters:
 *        - in: body
 *          name: body
 *          description: User object that needs to be registered
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        '201':
 *          description: User successfully created
 *        '400':
 *          description: Invalid Input
 *        '500':
 *          description: Internal server error
 */

router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('latitude', 'Location latitude is required')
			.not()
			.isEmpty(),
		check('longitude', 'Location longitude is required')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, latitude, longitude } = req.body;

		try {
			// See if user name exists
			let user = await User.findOne({ name });

			if (user) {
				return res.status(400).json({
					errors: [
						{
							msg: 'User already exists, please choose another user name'
						}
					]
				});
			}

			// Fill user object fields
			const userFields = {};
			userFields.name = name;
			userFields.avatar = `/myAvatars/100/${name}`;
			userFields.location = {};
			userFields.location.latitude = latitude;
			userFields.location.longitude = longitude;

			// Create a new user
			user = new User(userFields);

			// save user to DB
			await user.save();

			// Return jsonwebtoken (change expires to 3600)
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Internal server error' });
		}
	}
);

/**
 *@swagger
 * path:
 *  /api/users/:
 *    get:
 *      tags:
 *        - users
 *      summary: Get all registered users
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *             type: "array"
 *             items:
 *               $ref: '#/definitions/User'
 *        '500':
 *          description: Internal server error
 */
router.get('/', async (req, res) => {
	try {
		// retrieves all users from DB and sorts them by points
		const users = await User.find().sort({ points: -1 });

		await res.status(200).json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Internal server error' });
	}
});

/**
 * @swagger
 * path:
 *   /api/users:
 *     delete:
 *       tags:
 *         - users
 *       summary: Delete all registered users
 *       responses:
 *         "200":
 *           description: All users removed
 *           schema:
 *             $ref: '#/definitions/User'
 *         "500":
 *           description: Internal server error
 */
router.delete('/', async (req, res) => {
	try {
		await User.remove();

		await res.status(200).json({ msg: 'All users removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Internal server error' });
	}
});

/**
 * @swagger
 * path:
 *   /api/users/{:id}:
 *     get:
 *       tags:
 *         - users
 *       summary: Get user profile by user ID
 *       parameters:
 *         - name: :id
 *           in: path
 *           description: ID of the user that needs to be returned
 *           required: true
 *           type: string
 *       responses:
 *         "200":
 *           description: successful operation
 *           schema:
 *             $ref: '#/definitions/User'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.get('/:id', async (req, res) => {
	try {
		// Finds a specific user by his id provided in the path parameters
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ msg: 'User not found by id' });
		}
		await res.status(200).json(user);
	} catch (err) {
		console.error(err.message);
		// check if id has invalid format
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'User not found by id' });
		}
		res.status(500).json({ msg: 'Internal server error' });
	}
});

/**
 * @swagger
 * path:
 *   /api/users/points:
 *     put:
 *       tags:
 *         - users
 *       summary: Increase points for a user with a given user id
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         "200":
 *           description: User score successfully updated
 *           schema:
 *             $ref: '#/definitions/User'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.put('/points', auth, async (req, res) => {
	try {
		let user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: 'User not found by id' }, user);
		}

		// Change user points --> increase by 1
		user.points++;

		// Save updates to database
		await user.save();

		await res.status(200).json(user);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Invalid user ID supplied' });
		}
		res.status(500).json({ msg: 'Internal server error' });
	}
});

/**
 * @swagger
 * path:
 *   /api/users/points/reset:
 *     put:
 *       tags:
 *         - users
 *       summary: Reset point score for a user with a given user id
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         "200":
 *           description: User score successfully reset
 *           schema:
 *             $ref: '#/definitions/User'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.put('/points/reset', auth, async (req, res) => {
	try {
		let user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: 'User not found by id' });
		}

		// Reset user points
		user.points = 0;

		// Save updates to database
		await user.save();
		await res.status(200).json({ msg: 'User score successfully reset.' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Invalid user ID supplied' });
		}
		res.status(500).json({ msg: 'Internal server error' });
	}
});

/**
 * @swagger
 * path:
 *   /api/users/location/:
 *     put:
 *       tags:
 *         - users
 *       summary: Update location of a user with a given user id
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Location parameters that need to be updated
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *       responses:
 *         "200":
 *           description: User location successfully updated
 *           schema:
 *             $ref: '#/definitions/User'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.put(
	'/location',
	[
		auth,
		[
			//checks for required fields and throws error array if failed
			(check('latitude', 'Location latitude is required')
				.not()
				.isEmpty(),
			check('longitude', 'Location longitude is required')
				.not()
				.isEmpty())
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Extract props from request body
		const { latitude, longitude } = req.body;

		try {
			let user = await User.findById(req.user.id);

			if (!user) {
				return res.status(404).json({ msg: 'User not found by id' });
			}

			// Update user properties
			user.location.latitude = latitude;
			user.location.longitude = longitude;

			await user.save();

			return res.status(200).json(user);
		} catch (err) {
			console.error(err.message);
			if (err.kind === 'ObjectId') {
				return res.status(400).json({ msg: 'Invalid user ID supplied' });
			}
			res.status(500).json({ msg: 'Internal server error' });
		}
	}
);

/**
 * @swagger
 * path:
 *   /api/users/me:
 *     delete:
 *       tags:
 *         - users
 *       summary: Delete a registered user by his user id
 *       parameters:
 *         - name: :id
 *           in: path
 *           description: ID of the user that needs to be deleted
 *           required: true
 *           type: string
 *       responses:
 *         "200":
 *           description: User successfully deleted
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.delete('me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: 'User not found by id' });
		}
		await user.delete();

		await res.status(200).json({ msg: 'User successfully removed' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Invalid user ID supplied' });
		}
		res.status(500).json({ msg: 'Internal server error' });
	}
});
module.exports = router;
