import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/userActions';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';

const AppNavbar = ({ logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar className="mb-5" color="dark" dark expand="sm">
				<Container>
					<NavbarBrand href="/">Rankit</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/adminHub">Admin Hub</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/userList">UserList</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/" onClick={logout}>
									Logout
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

AppNavbar.propTypes = {
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.userReducer
});

export default connect(mapStateToProps, { logout })(AppNavbar);
