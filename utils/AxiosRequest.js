const axios = require('axios');

const localUrl = '192.168.1.79';
const apiUrl = `http://${localUrl}:8000`; // Replace with your FastAPI server URL

export const fetchPredictions = async (userId) => {
  const requestData = {
    user_id: userId,
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
