import React, { Component } from 'react';
import axios from 'axios';
import {
	Container,
	Button,
	Form,
	Input,
	FormGroup,
	FormText,
	Label,
	Col
} from 'reactstrap';
import LocationMap from './LocationMap';
import UserList from './UserList';

class AdminHub extends Component {
	constructor(props) {
		super(props);

		this.clickAction = this.clickAction.bind(this);
		this.state = { name: '' };
	}

	componentDidMount() {
		this.setState = { name: '' };
	}

	clickAction() {
		axios.get('/api/users').then(response => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map(user => user.name),
					name: response.data[0].name
				});
				console.log(this.state);
			}
		});
	}

	render() {
		return (
			<div>
				<Container>
					<h1>AdminHub</h1>
					<p></p>
					<p>Hello, boss</p>
					<Button onClick={() => this.clickAction()} color="primary">
						Get
					</Button>
				</Container>

				<div class="list">
					<UserList />
				</div>
				<div class="map">
					<LocationMap />
				</div>
			</div>
		);
	}
}

export default AdminHub;
