import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

const UserListItem = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return <div></div>;
};
