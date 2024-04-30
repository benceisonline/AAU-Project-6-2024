const axios = require('axios').default;

const localUrl = '172.20.10.4';
const apiUrl = `http://${localUrl}:8000`;

export const fetchPredictions = async (userId, startIndex, noOfRecommendations) => {
	const requestData = {
		user_id: userId,
		start_index: startIndex,
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

export const fetchAllArticles = async (startIndex, noOfRecommendations) => {
	const requestData = {
		start_index: startIndex,
		no_recommendations: noOfRecommendations,
	};

  try {
    const response = await axios.post(apiUrl + '/all', requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error.message;
	}
}
