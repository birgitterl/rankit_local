import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserListItem = ({
	user: { _id, name, avatar, points, latitude, longitude }
}) => {
	return (
		<div>
			<h2>{name}</h2>
			<p>{points} Points</p>
		</div>
	);
};

UserListItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserListItem;
