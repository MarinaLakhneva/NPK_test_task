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
			const errorData = await response.json();
			throw new Error(JSON.stringify({
				status: response.status,
				message: errorData.message || 'Ошибка загрузки файла'
			}));
		}
		
		const data = await response.json();
		return data;
	} catch (error) {
		const { status, message } = JSON.parse(error.message);
		return { status, message };
	}
};
