import './Modal.css';
import classNames from 'classnames';
import {useCallback, useEffect, useState} from "react";

import {uploadFile} from '../../app/api/fileUpload';

import CsvDropzone from '../CsvDropzone';

import Loading from './Loading';
import RequestResponse from './RequestResponse';

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
			<div className={classNames('modal_content', {'modal_content_response': isRequestResponse})}>
				<div className='modal_content_header'>
					<p className='modal_title'>{modalTitle}</p>
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
				<div className='modal_content'>
					<div className='modal_content_header'>
						<p className='modal_title'>Загрузочное окно</p>
						{error ?
							<div className='modal_description_container'>
								<p className='modal_title_error'>Ошибка при добавлении:</p>
								<p className='modal_description'>{errorMsg}</p>
							</div>
							:
							<p className='modal_description'>Перед загрузкой дайте имя файлу</p>
						}
					</div>
					<div className={classNames('modal_content_content', {'modal_content_content_error': error})}>
						<div className={classNames(
							'modal_input_container',
							{'modal_input_container_hover': isHovered && name !== ''},
							{'modal_input_container_active': name !== ''})}
						>
							<input
								className={classNames(
									'input_name_file',
									{'input_name_file_hover': isHovered && name !== ''},)}
								placeholder='Название файла'
								value={name}
								onChange={(e) => (setName(e.target.value))}
							/>
							<button
								className={classNames(
									'btn_clear',
									{'btn_clear_active': name !== ''})}
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
				<div className='modal_footer'>
					<button
						className={classNames(
							'btn_download',
							{'btn_download_active': file && name})}
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
			'background_blur',
			{'transition': isTransition})}
		>
			<div className={classNames(
				'modal',
				{'modal_request': isRequestResponse})}
			>
				<div className='modal_container'>
					<div className='modal_background'>
						<div className={`background_color_default ${error && 'active_default'}`}></div>
						<div className={`background_color_error ${error && 'active_error'}`}></div>
						<div className={`background_color_success ${isRequestResponse && !error && !loading && 'active_success'}`}></div>
					</div>
					<div className='modal_header'>
						<button className='btn_close' onClick={closeModal}><Close/></button>
					</div>
					{content()}
				</div>
			</div>
		</div>
	);
}
