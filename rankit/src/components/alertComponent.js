import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';

const alertComponent = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<Alert key={alert.id} color={`${alert.alertType}`}>
			{alert.msg}
		</Alert>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alertReducer
});

export default connect(mapStateToProps)(alertComponent);
