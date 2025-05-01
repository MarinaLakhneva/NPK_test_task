import './Modal.css';
import classNames from 'classnames';
import {useEffect, useState} from "react";

import { uploadFile } from '../../app/api/fileUpload';
import CsvDropzone from '../../components/CsvDropzone';

import {Close} from '../svgCode/Close.jsx';
import {Clear} from '../svgCode/Clear.jsx';


export function Modal({handleClose}) {
	const [isHovered, setIsHovered] = useState(false);
	const [file, setFile] = useState(null);
	const [nameFile, setNameFile] = useState('');
	const handleClear = () => {
		setNameFile('');
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
	
	const handleFileUpload = (file) => {
		setFile(file);
	};
	
	const handleSubmit = async () => {
		try {
			const message = await uploadFile(file, nameFile);
			console.log(message);
		} catch (err) {
			console.log(err.message);
		}
	};
	
	return (
		<div  className={classNames(
			'blur',
			{'transition': isTransition})}
		>
			<div className='modal'>
				<div className={classNames(
					'modal_container',
					{'modal_container_success': !error},
					{'modal_container_error': error})}
				>
					<div className='modal_header'>
						<button className='btn_close' onClick={closeModal}><Close/></button>
					</div>
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
								{'modal_input_container_hover': isHovered && nameFile !== ''},
								{'modal_input_container_active': nameFile !== ''})}
							>
								<input
									className={classNames(
										'input_name_file',
										{'input_name_file_hover': isHovered && nameFile !== ''},)}
									placeholder='Название файла'
									value={nameFile}
									onChange={(e) => (setNameFile(e.target.value))}
								/>
								<button
									className={classNames(
										'btn_clear',
										{'btn_clear_active': nameFile !== ''})}
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
								{'btn_download_active': file && nameFile})}
							onClick={handleSubmit}
							disabled={file === null || nameFile === ''}
						>
							Загрузить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
