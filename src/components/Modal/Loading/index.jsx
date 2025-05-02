import './Loading.css';
import Throbber from './assets/throbber.svg';

export function Loading() {
	return (
			<div className='modal_content_content_loading'>
				<img src={Throbber} className='rotating'/>
			</div>
	);
}
