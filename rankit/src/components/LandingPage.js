//TODO: Admin-Button, insert name field, submit button
import React, { Component } from 'react';
import { Container, Button, Form, Input, FormGroup, FormText, Label, Col } from 'reactstrap';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
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
							<Label for="userName" sm={1}>Name:</Label>
							<Col sm={10}>
								<Input type="text" value={this.state.value}
									onChange={this.handleChange} />
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
