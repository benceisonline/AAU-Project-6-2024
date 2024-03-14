const axios = require('axios').default;

const apiUrl = 'http://172.20.10.13:8000/predict'; // Replace with your FastAPI server URL

const fetchData = async (userId) => {
  const requestData = {
    user_id: userId,
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

module.exports = fetchData;
