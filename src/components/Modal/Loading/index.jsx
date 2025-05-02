import React from 'react';
import styles from './Loading.module.css';
import Throbber from './assets/throbber.svg';

class Loading extends React.Component {
	render() {
		return (
			<div className={styles.modal_content_loading}>
				<img src={Throbber} className={styles.throbber} alt="Loading..." />
			</div>
		);
	}
}

export default Loading;
