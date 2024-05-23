const axios = require('axios').default;
import Constants from 'expo-constants';

export const fetchPredictions = async (userId, startIndex, noOfRecommendations) => {
	const requestData = {
		user_id: userId,
		start_index: startIndex,
		no_recommendations: noOfRecommendations,
	};


	try {
		const response = await axios.post(Constants.expoConfig.extra.LOCAL_URL + '/predict', requestData, {
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
    const response = await axios.post(Constants.expoConfig.extra.LOCAL_URL + '/all', requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}
