import './Modal.css';
import classNames from 'classnames';
import {useEffect, useState} from "react";

import {uploadFile} from '../../app/api/fileUpload';
import CsvDropzone from '../../components/CsvDropzone';

import {Loading} from './Loading';
import {RequestResponse} from './RequestResponse';

import {Close} from '../../assets/svgCode/Close';
import {Clear} from '../../assets/svgCode/Clear';

export function Modal({handleClose}) {
	const [isHovered, setIsHovered] = useState(false);
	
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [name, setName] = useState('');
	const handleClear = () => {
		setName('');
	};
	
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
	
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	
	const onChangeError = (error, errorMsg) => {
		setTimeout(() => {
			setError(error);
			setErrorMsg(errorMsg);
		}, 400);
	};
	
	const handleFileUpload = (file, fileName) => {
		setFile(file);
		setFileName(fileName);
	};
	
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

	
	function content(){
		if(loading){
			return <Loading/>;
		}
		if(isRequestResponse){
			return <RequestResponse dataFile={dataFile} filename={fileName} errorMsg={errorMsg}/>
		}
		
		return(
			<>
				<div className='modal_content'>
					<div className='modal_content_header'>
						<p className='modal_title'>Загрузочное окно</p>
						{errorMsg ?
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
						<CsvDropzone onChangeError={onChangeError} onFileUpload={handleFileUpload}/>
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
			'blur',
			{'transition': isTransition})}
		>
			<div className={classNames(
				'modal',
				{'modal_request': isRequestResponse})}
			>
				<div className={classNames(
					'modal_container',
					{'modal_container_success': !error && !loading},
					{'modal_container_error': error})}
				>
					<div className='modal_header'>
						<button className='btn_close' onClick={closeModal}><Close/></button>
					</div>
					{content()}
				</div>
			</div>
		</div>
	);
}
