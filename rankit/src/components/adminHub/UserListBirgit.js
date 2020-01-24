import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ListItem from './UserListItem';
import { getUsers } from '../../actions/userActions';
import { ListGroup } from 'reactstrap';

const UserListBirgit = ({ getUsers, userState: { users, userLoading } }) => {
	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<Fragment>
			{userLoading ? (
				<Spinner />
			) : (
				<Fragment>
					<h5>Online Players</h5>
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
