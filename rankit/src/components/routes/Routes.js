import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminHub from '../AdminHub';
import PlayersView from '../PlayersView';
import Container from 'reactstrap/es/Container';

const Routes = () => {
	return (
		<Container>
			<Switch>
				<Route exact path="/playersView" component={PlayersView} />
				<Route exact path="/adminHub" component={AdminHub} />
			</Switch>
		</Container>
	);
};

export default Routes;
