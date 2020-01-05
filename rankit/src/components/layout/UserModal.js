import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import { connect } from 'react-redux';

class UserModal extends Component {
	state = {
		modal: false,
		name: ''
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			latitude: 14.546,
			longitude: 34.234
		};

		//Add item via addItem action
		//this.props.addItem(newUser);

		//Close modal
		this.toggle();
	};

	render() {
		return (
			<div>
				<Button
					color="info"
					style={{ marginBottom: '2rem' }}
					onClick={this.toggle}
				>
					Register to Rankit
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Play the Game</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="user">Your User Name</Label>
								<Input
									type="text"
									name="name"
									id="user"
									placeholder="User Name"
									onChange={this.onChange}
								/>
							</FormGroup>
							<Button color="info" style={{ marginTop: '2rem' }} block>
								Start
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(UserModal);
