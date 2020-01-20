import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminHub from '../AdminHub/AdminHub';
import PlayersView from '../PlayersView';
import UserList from '../AdminHub/UserListBirgit';
import Container from 'reactstrap/es/Container';

const Routes = () => {
	return (
		<Container>
			<Switch>
				<Route exact path="/playersView" component={PlayersView} />
				<Route exact path="/adminHub" component={AdminHub} />
				<Route exact path="/userList" component={UserList} />
			</Switch>
		</Container>
	);
};

export default Routes;
