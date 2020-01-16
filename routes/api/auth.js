const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route    GET api/auth
// @desc     Get token route
// @access   Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		await res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;