const axios = require('axios').default;

const localUrl = '172.20.10.2';
const apiUrl = `http://${localUrl}:8000`;

export const fetchPredictions = async (userId, noOfRecommendations) => {
	const requestData = {
		user_id: userId,
		no_recommendations: noOfRecommendations,
	};

	try {
		const response = await axios.post(apiUrl + '/predict', requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error.message;
	}
};

export const fetchAllArticles = async () => {
  try {
    const response = await axios.get(apiUrl + '/all', {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}
