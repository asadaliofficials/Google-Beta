import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

const params = {
	key: 'AIzaSyAyqq7FWJ4fK_yDujUMw0itiPx76qG45NQ',
	cx: '3412850a10c704f9e',
};

export const fetchDataFromApi = async payload => {
	const { data } = await axios.get(BASE_URL, {
		params: { ...params, ...payload },
	});
	return data;
};
