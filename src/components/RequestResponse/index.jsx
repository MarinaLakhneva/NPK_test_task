import styles from './RequestResponse.module.css';
import React from 'react';

export function RequestResponse({dataFile, filename, error, errorMsg}) {
	const date = new Date(dataFile.timestamp);
	const timestamp = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}
														${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
	
	return (
		<div className={styles.modal_content_request_response}>
			{error ? (
				<div className={styles.request_response}>
					<p className={styles.request_response_description}>{errorMsg}</p>
				</div>
			) : (
				<>
					<p className={styles.request_response_description}>filename:</p>
					<p className={styles.request_response_description}>{filename}</p>
					<div className={styles.request_response}>
						<p className={styles.request_response_description}>name: {dataFile.name}</p>
						<p className={styles.request_response_description}>timestamp: {timestamp}</p>
						<p className={styles.request_response_description}>message: {dataFile.message}</p>
					</div>
				</>
			)}
		</div>
	);
}
