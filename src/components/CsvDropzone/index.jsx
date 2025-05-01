import './CsvDropzone.css';
import classNames from "classnames";
import React, {useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';

import Dir from './assets/dir.svg';
import File_1 from './assets/file_1.svg';
import File_2 from './assets/file_2.svg';

const initial = {
	name: '',
	size: 0,
	date: ''
}
const CsvDropzone = ({onChangeError, onFileUpload }) => {
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
	const [nextStep, setNextStep] = useState(false);
	
	const [isTransition, setIsTransition] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			if(nextStep){
				setIsTransition(true);
			}
			else {
				setIsTransition(false);
			}
			
		}, 300);
		
		return () => clearTimeout(timer);
	}, [nextStep]);
	
	const onDrop = (acceptedFiles, rejectedFiles) => {
		if (acceptedFiles.length > 0) {
			acceptedFiles.forEach((file) => {
				if (file.size > 1073741824) {
					onChangeError(true, 'Размер файла не должен превышать 1ГБ');
				} else {
					onChangeError(false, '');
					setFileInformation({
						name: file.name,
						size: file.size,
						date: new Date(file.lastModified).toLocaleDateString("en-US")
					});
					setNextStep(true);
					onFileUpload(file, file.name);
				}
			});
		}
		
		if (rejectedFiles.length > 0) {
			rejectedFiles.forEach(() => {
				setNextStep(false);
				onChangeError(true, 'Неправильный формат файла');
			});
		}
	};
	
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {'text/csv': ['.csv']}
	});
	
	return (
		<div {...getRootProps({ className: 'load_file_block' })}>
			{!nextStep ?
			<>
				<input {...getInputProps()} />
				<div className='load_file_block_animation'>
					<img src={Dir} alt='dir' className='img_dir' />
					<img
						src={File_1}
						alt='file'
						className='img_file_1'
						style={{ transform: `translateY(${offset}px)` }}
					/>
					<img
						src={File_2}
						alt='file'
						className='img_file_2'
						style={{ transform: `translateY(${-offset}px)` }}
					/>
					<span className='load_file_block_animation_blur'></span>
				</div>
				<p className='load_file_block_animation_description'>
					{isDragActive ? 'Да-да, все так, пускай!' : 'Перенесите ваш файл сюда'}
				</p>
			</>
			:
			<div className={classNames('load_file_block_success', {'load_file_block_success_transition': isTransition})}>
				<p className='load_file_block_title'>Успешно добавлен</p>
				<div className='load_file_block_description'>
					<p className='load_file_block_file_name'>{fileInformation.name}</p>
					<div className='load_file_block_description_container'>
						<div className='load_file_block_description_container_'>
							<p className='load_file_block_description_title'>Размер файла:</p>
							<p className='load_file_block_description_value'>{fileInformation.size}б</p>
						</div>
						<div className='load_file_block_description_container_'>
							<p className='load_file_block_description_title'>Дата изменения:</p>
							<p className='load_file_block_description_value'>{fileInformation.date}</p>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default CsvDropzone;
