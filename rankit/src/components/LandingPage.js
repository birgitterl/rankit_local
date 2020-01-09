import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';
import { Container, Button, Form, Input, FormGroup, Label } from 'reactstrap';

class LandingPage extends Component {
	state = {
		name: ''
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name
		};

		//Add user via addUser action
		this.props.addUser(newUser);
	};

	render() {
		return (
			<div>
				<Container>
					<h2 className="text-center">Welcome to Rankit</h2>
					<br />
					<p className="text-center">Enter your name to join the game</p>
					<Form onSubmit={this.onSubmit}>
						<FormGroup>
							<Label for="name">Name</Label>
							<Input
								type="text"
								name="name"
								id="name"
								placeholder="Enter your name"
								onChange={this.onChange}
							/>
						</FormGroup>
						<Button color="dark" style={{ marginTop: '2rem' }} block>
							Enter
						</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps, { addUser })(LandingPage);

/*constructor(props) {
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
*/
