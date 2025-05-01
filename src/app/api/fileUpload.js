export const uploadFile = async (file, name) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('name', name);
	
	try {
		const response = await fetch('https://file-upload-server-mc26.onrender.com/api/v1/upload', {
			method: 'POST',
			body: formData,
		});
		
		if (!response.ok) {
			throw new Error('Ошибка загрузки файла');
		}
		
		const data = await response.json();
		return data.message;
	} catch (error) {
		throw new Error('Ошибка загрузки файла');
	}
};

