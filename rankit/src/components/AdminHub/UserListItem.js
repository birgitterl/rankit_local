import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	ListGroupItem,
	Collapse,
	Card,
	CardBody,
	Container,
	Row,
	Col
} from 'reactstrap';

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
				<p onClick={toggle}>
					<h5>{name}</h5>
					<p>{points} Points</p>
				</p>
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
