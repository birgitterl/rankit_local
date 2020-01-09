//TODO: Admin-Button, insert name field, submit button
import React, { Component } from 'react';
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
import axios from 'axios';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ name: event.target.value });
	}

	handleSubmit(event) {
		//alert('A name was submitted: ' + this.state.value);
		event.preventDefault();

		console.log(`Form submitted:`);
		console.log(`User Name: ${this.state.name}`);

		const userName = {
			name: this.state.name
		};

		axios
			.post('/api/users/user', userName.name)
			.then(res => console.log(res.data));
	}

	render() {
		return (
			<div>
				<Container>
					<h1>LandingPage</h1>
					<p></p>
					<p>Welcome to Rankit!</p>
					<p>Join the game :-)</p>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup row>
							<Label for="userName" sm={1}>
								Name:
							</Label>
							<Col sm={10}>
								<Input
									type="text"
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<Button color="primary">Submit</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

export default LandingPage;
