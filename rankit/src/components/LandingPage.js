import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';
import UserModal from './UserModal';

class LandingPage extends Component {
	render() {
		return (
			<div>
				<Container>
					<h1 className="p-5 text-center">Welcome to Rankit</h1>
					<p className="p-5 text-center">Start the game by adding your name</p>
					<UserModal />
				</Container>
			</div>
		);
	}
}

export default LandingPage;
