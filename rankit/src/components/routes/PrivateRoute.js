import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading: authLoading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated && !authLoading ? (
				<Redirect to="/" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.userReducer
});

export default connect(mapStateToProps)(PrivateRoute);
