const axios = require('axios').default
import { LOCAL_URL } from '@env'

export const fetchPredictions = async (userId, startIndex, noOfRecommendations) => {
	const requestData = {
		user_id: userId,
		start_index: startIndex,
		no_recommendations: noOfRecommendations,
	};

	try {
		const response = await axios.post(LOCAL_URL + '/predict', requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const fetchAllArticles = async (startIndex, noOfRecommendations) => {
	const requestData = {
		start_index: startIndex,
		no_recommendations: noOfRecommendations,
	};

  try {
    const response = await axios.post(LOCAL_URL + '/all', requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}
