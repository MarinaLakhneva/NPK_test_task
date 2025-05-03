import styles from './Loading.module.css';
import React from 'react';
import Throbber from './assets/throbber.svg';

export function Loading() {
	return (
			<div className={styles.modal_content_loading}>
				<img src={Throbber} className={styles.throbber} alt="Loading..." />
			</div>
		);
}
