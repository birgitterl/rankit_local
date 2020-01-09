import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import LandingPage from './components/LandingPage';
import Routes from './components/routes/Routes';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Fragment>
						<AppNavbar />
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route component={Routes} />
						</Switch>
					</Fragment>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
