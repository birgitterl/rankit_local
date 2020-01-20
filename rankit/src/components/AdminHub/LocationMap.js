import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { getUsers } from '../../actions/userActions';
import L from 'leaflet';

//TODO: icon not found
const runner = L.icon({
	iconUrl: 'runner.png',
	iconSize: [32, 38]
	//iconAnchor: [25, 16]
});

const LocationMap = ({ getUsers, userState: { users, loading } }) => {
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	users.map(user => console.log(user));

	return (
		<div>
			<Map center={[48.336405, 14.32049]} zoom={16}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>

				{users.map(user => (

					<Marker
						key={user._id}
						position={[user.location.latitude, user.location.longitude]}
						icon={runner}
					/>

				))}
			</Map>
		</div>
	);
}

LocationMap.propTypes = {
	getUsers: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	userState: state.userReducer
});

export default connect(mapStateToProps, { getUsers })(LocationMap);
