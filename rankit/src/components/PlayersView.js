import React, { Fragment, useEffect, useState } from 'react';
import { getCurrentUser, updateVote } from '../actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const PlayersView = ({ updateVote, auth: { user } }) => {
	return user === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="player-inner">
				<h1>Hello {user.name}</h1>
				<br />
				<img src={user.avatar} className="rounded-circle" alt="Your Avatar" />
				<br />
				<h5>Your current score is {user.points} points</h5>
				<br />
				<h5>Press the button to rank-up</h5>
				<br />
				<button
					type="button"
					className="btn btn-success btn-circle btn-xl"
					onClick={() => updateVote()}
				>
					Vote
				</button>
			</div>
		</Fragment>
	);
};

PlayersView.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	updateVote: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.userReducer
});

export default connect(mapStateToProps, { updateVote })(PlayersView);
