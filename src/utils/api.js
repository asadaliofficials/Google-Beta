import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

const params = {
	key: 'your_api_key',
	cx: 'your_cs_key',
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
