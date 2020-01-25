import React, { Fragment, useEffect } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { connect } from './node_modules/react-redux';
import Spinner from '../layout/Spinner';
import ListItem from './UserListItem';
import { getUsers } from '../../actions/userActions';
import { ListGroup } from './node_modules/reactstrap';

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
