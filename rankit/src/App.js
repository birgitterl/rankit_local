import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import LandingPage from './components/LandingPage';
import Routes from './components/routes/Routes';
import Alert from './components/Alert';
import './App.css';

// Redux
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/userActions';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<AppNavbar />
					<Alert />
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
