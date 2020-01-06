import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminHub from '../AdminHub';
import Login from '../AdminLogin';
import PlayersView from '../PlayersView';

const Routes = () => {
	return (
		<section className="container">
			<Switch>
				<Route exact path="/rankit" component={PlayersView} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/adminHub" component={AdminHub} />
			</Switch>
		</section>
	);
};

export default Routes;
