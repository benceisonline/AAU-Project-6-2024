const axios = require('axios').default;

const localUrl = '172.20.10.3';
const apiUrl = `http://${localUrl}:8000`; // Replace with your FastAPI server URL

const fetchPredictions = async (userId) => {
  const requestData = {
    user_id: userId,
    no_recommendations: 10
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

module.exports = fetchPredictions;
