import React from 'react';
import LocationMap from './LocationMap';
import UserListBirgit from './UserListBirgit';

const AdminHub = () => {
	return (
		<div>
			<div class="list">
				<UserListBirgit />
			</div>
			<div class="map">
				<LocationMap />
			</div>
		</div>
	);
};

export default AdminHub;
