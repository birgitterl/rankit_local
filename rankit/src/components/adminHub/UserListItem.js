import React, { useState } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import {
	ListGroupItem,
	Collapse,
	Card,
	CardBody,
	Container,
	Row,
	Col
} from './node_modules/reactstrap';

const UserListItem = ({
	user: {
		_id,
		name,
		avatar,
		points,
		location: { latitude, longitude }
	}
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<ListGroupItem>
			<div>
				<div onClick={toggle}>
					<h5>{name}</h5>
					<p>{points} Points</p>
				</div>
				<Collapse isOpen={isOpen}>
					<Card>
						<CardBody>
							<Container>
								<Row>
									<Col xs="5">
										<img
											src={avatar}
											className="rounded-circle"
											alt="Your Avatar"
										/>
									</Col>
									<Col xs="auto">
										<p>Latitude: {latitude}</p>
										<p>Longitude: {longitude}</p>
									</Col>
								</Row>
							</Container>
						</CardBody>
					</Card>
				</Collapse>
			</div>
		</ListGroupItem>
	);
};

UserListItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserListItem;
