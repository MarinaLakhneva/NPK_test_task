import './Modal.css';
import classNames from 'classnames';
import {useEffect, useState} from "react";
import {Close} from '../svgCode/Close.jsx';
import {Clear} from '../svgCode/Clear.jsx';

import CsvDropzone from '../../components/CsvDropzone';


export function Modal({handleClose}) {
	const [isHovered, setIsHovered] = useState(false);
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
	
	return (
		<div  className={classNames(
			'blur_back',
			{'open': isTransition}
		)}
		>
			<div className='modal'>
				<div className='modal_container'>
					<div className='modal_header'>
						<button className='modal_btn_close' onClick={closeModal}><Close/></button>
					</div>
					<div className='modal_content'>
						<div className='modal_content_header'>
							<p className='modal_title'>Загрузочное окно</p>
							<p className='modal_description'>Перед загрузкой дайте имя файлу</p>
						</div>
						<div className='modal_options'>
							<div className={classNames(
								'modal_input_container',
								{'modal_input_container_hover': isHovered && nameFile !== ''},
								{'modal_input_container_active': nameFile !== ''}
							)}
							>
								<input
									className={classNames(
										'modal_input',
										{'modal_input_hover': isHovered && nameFile !== ''},
									)}
									placeholder='Название файла'
									value={nameFile}
									onChange={(e) => (setNameFile(e.target.value))}
								/>
								<button
									className={
									classNames(
										'modal_btn_clear',
										{'modal_btn_clear_active': nameFile !== ''}
									)}
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									onClick={handleClear}
								>
									<Clear/>
								</button>
							</div>
							<CsvDropzone/>
						</div>
					</div>
					<div className='modal_footer'>
						<button className='modal_btn_download'>Загрузить</button>
					</div>
				</div>
			</div>
		</div>
	);
}
