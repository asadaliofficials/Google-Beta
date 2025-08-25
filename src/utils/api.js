import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

const params = {
	key: 'AIzaSyAzMFm1z_fozi_VszJNmG50PHW7vwq53nc',
	cx: '17c111dc0d561483b',
};

export const fetchDataFromApi = async payload => {
	console.log('making api request to google server....🖥️');
	try {
		const { data } = await axios.get(BASE_URL, {
			params: { ...params, ...payload },
		});
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return [null];
	}
};
