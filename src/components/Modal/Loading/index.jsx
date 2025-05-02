import React from 'react';
import './Loading.css';
import Throbber from './assets/throbber.svg';

class Loading extends React.Component {
	render() {
		return (
			<div className='modal_content_content_loading'>
				<img src={Throbber} className='rotating' alt="Loading..." />
			</div>
		);
	}
}

export default Loading;
