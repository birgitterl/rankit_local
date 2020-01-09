import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';
import UserModal from './UserModal';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = { username: '' };
	}

	componentDidMount() {
		this.setState({
			users: ['test user'],
			username: 'test user'
		});
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	render() {
		return (
			<div>
				<Container>
					<h1 className="p-5 text-center">Welcome to Rankit</h1>
					<p className="p-5 text-center">Start the game by adding your name</p>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Username: </label>
							<input
								type="text"
								required
								value={this.state.username}
								onChange={this.onChangeUsername}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="submit"
								value="Create User"
								className="btn btn-primary"
							/>
						</div>
					</form>
				</Container>
			</div>
		);
	}
}

export default LandingPage;
