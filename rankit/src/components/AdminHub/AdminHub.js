import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import LocationMap from './LocationMap';
import UserListBirgit from './UserListBirgit';

const AdminHub = () => {
	return (
		<Row>
			<Col xs="6">
				<UserListBirgit />
			</Col>
			<Col xs="auto" className="map">
				<LocationMap />
			</Col>
		</Row>
	);
};

export default AdminHub;
