import './Loading.css';
import '../Modal.css';
import Throbber from './assets/throbber.svg';

export function Loading() {
	return (
		<>
			<div className='modal_content_header'>
				<p className='modal_title'>Загрузка файла</p>
			</div>
			<div className='modal_content_content_loading'>
				<img src={Throbber} className='rotating'/>
			</div>
		</>
	)
}
