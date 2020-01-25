import { useState, useEffect } from 'react';
import { updateLocation } from '../../actions/userActions';

export const usePosition = () => {
	const [position, setPosition] = useState({ latitude: 8, longitude: 4 });
	const [error, setError] = useState(null);

	const onChange = ({ coords }) => {
		setPosition({
			latitude: coords.latitude,
			longitude: coords.longitude
		});
		console.log(coords.latitude);
	};

	const onError = error => {
		setError(error.message);
	};

	useEffect(() => {
		const geo = navigator.geolocation;
		if (!geo) return setError('Geolocation is not supported');

		const watcher = geo.watchPosition(onChange, onError);
		return () => geo.clearWatch(watcher);
	}, []);

	return { ...position, error };
};
