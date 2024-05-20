import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPredictions, fetchAllArticles, apiUrl } from '../utils/AxiosRequest';

const mock = new MockAdapter(axios);

describe('fetchPredictions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch predictions successfully (200)', async () => {
    const userId = '10020';
    const startIndex = 0;
    const noOfRecommendations = 5;
    const responseData = [{ article_id: 1, title: 'Test Article' }];

    mock.onPost(`${apiUrl}/predict`, {
      user_id: userId,
      start_index: startIndex,
      no_recommendations: noOfRecommendations,
    }).reply(200, responseData);

    const predictions = await fetchPredictions(userId, startIndex, noOfRecommendations);
    expect(predictions).toEqual(responseData);
  });

  it('should handle errors when fetching predictions (404 Not Found)', async () => {
    const userId = null;
    const startIndex = 0;
    const noOfRecommendations = 5;
    const expectedErrorMsg = 'Request failed with status code 404';

    mock.onPost(`${apiUrl}/predict`).reply(404, expectedErrorMsg);

    try {
      await fetchPredictions(userId, startIndex, noOfRecommendations);
    } catch (error) {
      expect(error.message).toBe(expectedErrorMsg);
    }
  });
});

describe('fetchAllArticles', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch all articles successfully', async () => {
    const startIndex = 0;
    const noOfRecommendations = 5;
    const responseData = [{ article_id: 1, title: 'Test Article' }];

    mock.onPost(`${apiUrl}/all`, {
      start_index: startIndex,
      no_recommendations: noOfRecommendations,
    }).reply(200, responseData);

    const articles = await fetchAllArticles(startIndex, noOfRecommendations);
    expect(articles).toEqual(responseData);
  });

  it('should handle errors when fetching all articles', async () => {
    const startIndex = -5;
    const noOfRecommendations = 5;
    const expectedErrorMsg = 'Request failed with status code 404';

    mock.onPost(`${apiUrl}/all`).reply(404, expectedErrorMsg);

    await expect(fetchAllArticles(startIndex, noOfRecommendations)).rejects.toThrow(expectedErrorMsg);
  });
});
