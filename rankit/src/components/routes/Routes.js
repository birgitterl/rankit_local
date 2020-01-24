import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminHub from '../adminHub/AdminHub';
import PlayersView from '../playersView/PlayersView';
import UserListBirgit from '../adminHub/UserListBirgit';
import Container from 'reactstrap/es/Container';

const Routes = () => {
	return (
		<Container>
			<Switch>
				<Route exact path="/playersView" component={PlayersView} />
				<Route exact path="/adminHub" component={AdminHub} />
				<Route exact path="/userList" component={UserListBirgit} />
			</Switch>
		</Container>
	);
};

export default Routes;
