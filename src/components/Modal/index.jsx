import './Modal.css';
import classNames from 'classnames';
import Close from './assets/close.svg';
import Clear from './assets/clear.svg';
import Dir from './assets/dir.svg';
import File_1 from './assets/file_1.svg';
import File_2 from './assets/file_2.svg';
import {useEffect, useState} from "react";
export function Modal({isOpen, handleClose}) {
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
	
	
	return (
		<div  className={classNames('blur_back', {['open']: isOpen})}>
			<div className='modal'>
				<div className='modal_container'>
					<div className='modal_header'>
						<button className='modal_btn_close' onClick={handleClose}>
							<img src={Close} alt='close' width={20} height={20}/>
						</button>
					</div>
					<div className='modal_content'>
						<div className='modal_content_header'>
							<p className='modal_title'>Загрузочное окно</p>
							<p className='modal_description'>Перед загрузкой дайте имя файлу</p>
						</div>
						<div className='modal_options'>
							<div className='modal_input_container'>
								<input className='modal_input' placeholder='Название файла'/>
								<button className='modal_btn_clear'>
									<img src={Clear} alt='clear' width={23.57} height={23.57}/>
								</button>
							</div>
							<div className='modal_load_file_block'>
								<div className='modal_interactive'>
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
										style={{ transform: `translateY(${-offset}px) `}}
									/>
									<div className='modal_interactive_blur'></div>
								</div>
								
								<div>
								
								</div>
							</div>
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
