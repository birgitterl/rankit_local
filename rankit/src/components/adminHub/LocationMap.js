import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { getUsers } from '../../actions/userActions';
import { Icon } from 'leaflet';

const LocationMap = ({ getUsers, userState: { users, loading } }) => {
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	users.map(user => console.log(user));

	const [activeMarker, setActiveMarker] = React.useState(null);

	return (
		<div>
			<h5>Locations</h5>
			<Map center={[48.336405, 14.32049]} zoom={16}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>

				{users.map(user => (
					<Marker
						key={user._id}
						position={[user.location.latitude, user.location.longitude]}
						onClick={() => {
							setActiveMarker(user);
						}}
					/>
				))}

				{activeMarker && (
					<Popup
						position={[
							activeMarker.location.latitude,
							activeMarker.location.longitude
						]}
						onClose={() => {
							setActiveMarker(null);
						}}
					>
						<div>
							<h3>{activeMarker.name}</h3>
							<h4>{activeMarker.points}</h4>
							<img
								src={activeMarker.avatar}
								className="rounded-circle"
								alt="Your Avatar"
							/>
							<p>
								[{activeMarker.location.latitude},{' '}
								{activeMarker.location.longitude}]
							</p>
						</div>
					</Popup>
				)}
			</Map>
		</div>
	);
};

LocationMap.propTypes = {
	getUsers: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	userState: state.userReducer
});

export default connect(mapStateToProps, { getUsers })(LocationMap);
