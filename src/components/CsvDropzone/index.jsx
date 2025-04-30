import './CsvDropzone.css';
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
const CsvDropzone = () => {
	const [offset, setOffset] = useState(0);
	const [direction, setDirection] = useState(1);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setOffset(prevOffset => prevOffset + direction * 1);
			
			if (offset >= 1) {
				setDirection(-1);
			} else if (offset <= -1) {
				setDirection(1);
			}
		}, 200);
		
		return () => clearInterval(interval);
	}, [offset, direction]);
	
	
	const [fileInformation, setFileInformation] = useState(initial);
	const [status, setStatus] = useState(false);
	
	const onDrop = (acceptedFiles, rejectedFiles) => {
		if (acceptedFiles.length > 0) {
			acceptedFiles.forEach((file) => {
				if (file.size > 1073741824) {
					alert(`Файл ${file.name} слишком большой. Максимальный размер - 1 ГБ.`);
				} else {
					setFileInformation({
						name: file.name,
						size: file.size,
						date: new Date(file.lastModified)
					});
					setStatus(true);
				}
			});
		}
		
		if (rejectedFiles.length > 0) {
			rejectedFiles.forEach((file) => {
				setStatus(false);
				console.error('Ошибка загрузки файла:', file.name);
				console.error('Причина:', file.errors.map(error => error.message).join(', '));
			});
			alert('Ошибка: Загрузите файл в формате .csv!');
		}
	};
	
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {'text/csv': ['.csv']}
	});
	
	return (
		<div {...getRootProps({ className: 'modal_load_file_block' })}>
			{!status ?
			<>
				<input {...getInputProps()} />
				<div className='modal_load_file_block_interactive'>
					<img src={Dir} alt='dir' className='modal_img_dir' />
					<img
						src={File_1}
						alt='file'
						className='modal_img_file_1'
						style={{ transform: `translateY(${offset}px)` }}
					/>
					<img
						src={File_2}
						alt='file'
						className='modal_img_file_2'
						style={{ transform: `translateY(${-offset}px)` }}
					/>
					<span className='modal_load_file_block_interactive_blur'></span>
				</div>
				<p className='modal_load_file_block_description'>
					{isDragActive ? 'Да-да, все так, пускай!' : 'Перенесите ваш файл сюда'}
				</p>
			</>
			:
			<div className='modal_load_file_block_success'>
				<p className='modal_load_file_block_title'>Успешно добавлен</p>
				<div className='modal_load_file_block_description_container_1'>
					<p className='modal_load_file_block_description_1'>{fileInformation.name}</p>
					<div className='modal_load_file_block_description_container_2'>
						<div className='modal_load_file_block_description_container_3'>
							<p className='modal_load_file_block_description_2'>Размер файла:</p>
							<p className='modal_load_file_block_description_2'>{fileInformation.size} байт</p>
						</div>
						<div className='modal_load_file_block_description_container_3'>
							<p className='modal_load_file_block_description_2'>Дата изменения:</p>
							<p className='modal_load_file_block_description_2'>{fileInformation.date.toLocaleDateString("en-US")}</p>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default CsvDropzone;
