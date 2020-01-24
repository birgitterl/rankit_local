import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/userActions';
import { setAlert } from '../../actions/alertActions';
import { Button, Form, Input, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const LandingPage = ({ registerUser, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: ''
	});

	const { name } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		// add a user
		registerUser({ name });
	};

	// Redirect if authenticated
	if (isAuthenticated) {
		return <Redirect to="/playersView" />;
	}

	return (
		<Fragment>
			<h2 className="text-center">Welcome to Rankit</h2>
			<br />
			<p className="text-center">Enter your name to join the game</p>
			<Form onSubmit={e => onSubmit(e)}>
				<FormGroup>
					<Input
						type="text"
						name="name"
						value={name}
						placeholder="Enter your name"
						onChange={e => onChange(e)}
					/>
				</FormGroup>
				<Button color="dark" style={{ marginTop: '2rem' }} block>
					Enter
				</Button>
			</Form>
		</Fragment>
	);
};

LandingPage.propTypes = {
	registerUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated
});

export default connect(mapStateToProps, { registerUser, setAlert })(
	LandingPage
);
/*
class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '' };
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push(/playersView);
		}
	}


	handleChange = e =>{
		this.setState({[e.target.name] : e.target.value });
	};

	handleSubmit = e => {
		//alert('A name was submitted: ' + this.state.value);
		e.preventDefault();

		const newUser = {
			name: this.state.name
		};

	this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const {errors} = this.state;
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
