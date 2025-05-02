import styles from './Modal.module.css';
import classNames from 'classnames';
import {useCallback, useEffect, useState} from 'react';

import {uploadFile} from '../../app/api/fileUpload';

import CsvDropzone from '../CsvDropzone';

import Loading from '../Loading';
import RequestResponse from '../RequestResponse';

import {Close} from '../../assets/svgCode/Close';
import {Clear} from '../../assets/svgCode/Clear';


export function Modal({handleClose}) {
	const [isTransition, setIsTransition] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsTransition(true);
		}, 300);
		
		return () => clearTimeout(timer);
	}, []);
	
	const closeModal = () => {
		setIsTransition(false);
		setTimeout(() => {
			handleClose();
		}, 300);
	};
	
	const [isHovered, setIsHovered] = useState(false);
	
	const [name, setName] = useState('');
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');

	const handleClear = () => setName('');
	
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	
	const onChangeError = useCallback( (error, errorMsg) => {
		setError(error);
		setErrorMsg(errorMsg);
	}, []);
	
	const handleFileUpload = useCallback((file, fileName) => {
		setFile(file);
		setFileName(fileName);
	}, []);
	
	const [isRequestResponse, setIsRequestResponse] = useState(false);
	const [dataFile, setDataFile] = useState(null);
	const handleSubmit = async () => {
		setIsRequestResponse(true);
		setLoading(true);
		try {
			const data = await uploadFile(file, name);
			setDataFile(data);
		} catch (err) {
			if (err.status && err.message) {
				setError(true);
				setErrorMsg(`Error: ${err.status} ${err.message}`);
			} else {
				setError(true);
				setErrorMsg('Произошла неизвестная ошибка');
			}
		} finally {
			setLoading(false);
		}
	};
	
	function GenerateContent({modalTitle, content}) {
		return(
			<div className={classNames(styles.modal_content, {[styles.modal_content_response]: isRequestResponse})}>
				<div className={styles.modal_content_header}>
					<p className={styles.modal_title}>{modalTitle}</p>
				</div>
				{content}
			</div>
		);
	}
	
	function content(){
		if(loading){
			return <GenerateContent modalTitle='Загрузка файла' content={<Loading/>}/>;
		}
		if(isRequestResponse){
			return (
				<GenerateContent
					modalTitle={!error ? 'Файл успешно загружен' : 'Ошибка в загрузке файла'}
					content={<RequestResponse dataFile={dataFile} filename={fileName} error={error} errorMsg={errorMsg}/>}
				/>
			);
		}
		
		return(
			<>
				<div className={styles.modal_content}>
					<div className={styles.modal_content_header}>
						<p className={styles.modal_title}>Загрузочное окно</p>
						{error ?
							<div className={styles.modal_description_container}>
								<p className={styles.modal_title_error}>Ошибка при добавлении:</p>
								<p className={styles.modal_description}>{errorMsg}</p>
							</div>
							:
							<p className={styles.modal_description}>Перед загрузкой дайте имя файлу</p>
						}
					</div>
					<div className={classNames(styles.modal_content_content, {[styles.modal_content_content_error]: error})}>
						<div className={classNames(
							styles.modal_input_container,
							{[styles.modal_input_container_hover]: isHovered && name !== ''},
							{[styles.modal_input_container_active]: name !== ''})}
						>
							<input
								className={classNames(
									styles.input_name_file,
									{[styles.input_name_file_hover]: isHovered && name !== ''},)}
								placeholder='Название файла'
								value={name}
								onChange={(e) => (setName(e.target.value))}
							/>
							<button
								className={classNames(
									styles.btn_clear,
									{[styles.btn_clear_active]: name !== ''})}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								onClick={handleClear}
							>
								<Clear/>
							</button>
						</div>
						<CsvDropzone onChangeError={onChangeError} handleFileUpload={handleFileUpload}/>
					</div>
				</div>
				<div className={styles.modal_footer}>
					<button
						className={classNames(
							styles.btn_download,
							{[styles.btn_download_active]: file && name})}
						onClick={handleSubmit}
						disabled={file === null || name === ''}
					>
						Загрузить
					</button>
				</div>
			</>
		);
	}
	
	return (
		<div  className={classNames(
			styles.background_blur,
			{[styles.transition]: isTransition})}
		>
			<div className={classNames(
				styles.modal,
				{[styles.modal_request]: isRequestResponse})}
			>
				<div className={styles.modal_container}>
					<div className={styles.modal_background}>
						<div className={classNames(
							styles.background_color_default,
							{[styles.active_default]: error })}></div>
						<div className={classNames(
							styles.background_color_error,
							{[styles.active_error]: error })}></div>
						<div className={classNames(
							styles.background_color_success,
							{[styles.active_success]: isRequestResponse && !error && !loading })}></div>
					</div>
					<div className={styles.modal_header}>
						<button className={styles.btn_close} onClick={closeModal}><Close/></button>
					</div>
					{content()}
				</div>
			</div>
		</div>
	);
}
