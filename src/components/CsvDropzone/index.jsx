import styles from './CsvDropzone.module.css';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';

import Dir from './assets/dir.svg';
import File_back from './assets/file_back.svg';
import File_front from './assets/file_front.svg';

const initial = {
	name: '',
	size: 0,
	lastModified: ''
}

export const CsvDropzone = ({onChangeError, handleFileUpload }) => {
	const [offset, setOffset] = useState(0);
	const [direction, setDirection] = useState(1);
	useEffect(() => {
		const interval = setInterval(() => {
			setOffset(prevOffset => prevOffset + direction);
			
			if (offset >= 1) {
				setDirection(-1);
			} else if (offset <= -1) {
				setDirection(1);
			}
		}, 200);
		
		return () => clearInterval(interval);
	}, [offset, direction]);
	
	
	const [fileInformation, setFileInformation] = useState(initial);
	const [isFileUpload, setIsFileUpload] = useState(false);
	
	const [isTransition, setIsTransition] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			if(isFileUpload){
				setIsTransition(true);
			}
			else {
				setIsTransition(false);
			}
		}, 300);
		
		return () => clearTimeout(timer);
	}, [isFileUpload]);
	
	const onDrop = (acceptedFiles, rejectedFiles) => {
		if (acceptedFiles.length > 0) {
			acceptedFiles.forEach((file) => {
				if (file.size > 1073741824) {
					onChangeError(true, 'Размер файла не должен превышать 1ГБ');
				} else {
					onChangeError(false, '');
					const date = new Date(file.lastModified);
					const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
					setFileInformation({
						name: file.name,
						size: file.size,
						lastModified: formattedDate
					});
					setIsFileUpload(true);
					handleFileUpload(file, file.name);
				}
			});
		}
		
		if (rejectedFiles.length > 0) {
			rejectedFiles.forEach(() => {
				setIsFileUpload(false);
				onChangeError(true, 'Неправильный формат файла');
			});
		}
	};
	
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {'text/csv': ['.csv']}
	});
	
	return (
		<div {...getRootProps({ className: styles.block_uploading_file })}>
			{!isFileUpload ?
			<>
				<input {...getInputProps()} />
				<div className={styles.animation_container}>
					<img src={Dir} alt='dir' className={styles.img_dir} />
					<img
						src={File_back}
						alt='file'
						className={styles.img_back}
						style={{ transform: `translateY(${offset}px)` }}
					/>
					<img
						src={File_front}
						alt='file'
						className={styles.img_front}
						style={{ transform: `translateY(${-offset}px)` }}
					/>
					<span className={styles.animation_blur}></span>
				</div>
				<p className={styles.animation_description}>
					{isDragActive ? 'Да-да, все так, пускай!' : 'Перенесите ваш файл сюда'}
				</p>
			</>
			:
			<div className={classNames(styles.file_uploaded, {[styles.file_uploaded_transition]: isTransition})}>
				<p className={styles.file_uploaded_title}>Успешно добавлен</p>
				<div className={styles.file_uploaded_container}>
					<p className={styles.file_uploaded_name}>{fileInformation.name}</p>
					<div className={styles.file_uploaded_description}>
						<div className={styles.file_uploaded_description_container}>
							<p className={styles.file_uploaded_description_title}>Размер файла:</p>
							<p className={styles.file_uploaded_description_value}>{fileInformation.size}б</p>
						</div>
						<div className={styles.file_uploaded_description_container}>
							<p className={styles.file_uploaded_description_title}>Дата изменения:</p>
							<p className={styles.file_uploaded_description_value}>{fileInformation.lastModified}</p>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
};
