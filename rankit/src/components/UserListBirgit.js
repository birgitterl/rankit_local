import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import ListItem from './UserListItem';
import { getUsers } from '../actions/userActions';
import { ListGroup } from 'reactstrap';

const UserListBirgit = ({ getUsers, userState: { users, loading } }) => {
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	users.map(user => console.log(user));

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1>Online Players</h1>
					<ListGroup>
						{users.map(user => (
							<ListItem key={user._id} user={user} />
						))}
					</ListGroup>
				</Fragment>
			)}
		</Fragment>
	);
};

UserListBirgit.propTypes = {
	getUsers: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	userState: state.userReducer
});

export default connect(mapStateToProps, { getUsers })(UserListBirgit);
