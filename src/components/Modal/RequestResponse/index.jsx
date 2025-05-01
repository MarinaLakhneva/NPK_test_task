import './RequestResponse.css';
import '../Modal.css';

export function RequestResponse({dataFile, filename, errorMsg}) {
	const date = new Date(dataFile.timestamp);
	const timestamp = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}
														${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
	
	return (
		<div className='modal_content'>
			<div className='modal_content_header'>
				{errorMsg === '' ?
						<p className='modal_title'>Файл успешно загружен</p>
					:
						<p className='modal_title'>Ошибка в загрузке файла</p>
				}
			</div>
			{
				errorMsg === '' ?
					<div className='modal_content_content_request_response'>
						<p className='request_response_description'>filename:</p>
						<p className='request_response_description'>{filename}</p>
						<div className='request_response'>
							<p className='request_response_description'>name: {dataFile.name}</p>
							<p className='request_response_description'>timestamp: {timestamp}</p>
							<p className='request_response_description'>message: {dataFile.message}</p>
						</div>
					</div>
					:
					<div className='modal_content_content_request_response'>
						<div className='request_response'>
							<p className='request_response_description'>{errorMsg}</p>
						</div>
					</div>
			}
		</div>
	)
}
