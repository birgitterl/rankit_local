import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { getUsers } from '../../actions/userActions';

class LocationMap extends Component {
	//{getUsers().map(user => <Marker id={user.name} position={[user.latitude, user.longitude]} />)}

	render() {
		return (
			<div>
				<Map center={[48.336405, 14.32049]} zoom={16}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				</Map>
			</div>
		);
	}
}

export default LocationMap;
