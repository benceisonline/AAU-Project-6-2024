import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPredictions, fetchAllArticles } from '../utils/AxiosRequest';

const LOCAL_URL = 'http://172.20.10.4:8000';

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

    mock.onPost(`${LOCAL_URL}/predict`, {
      user_id: userId,
      start_index: startIndex,
      no_recommendations: noOfRecommendations,
    }).reply(200, responseData);

    const predictions = await fetchPredictions(userId, startIndex, noOfRecommendations);
    expect(predictions).toEqual(responseData);
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

    mock.onPost(`${LOCAL_URL}/all`, {
      start_index: startIndex,
      no_recommendations: noOfRecommendations,
    }).reply(200, responseData);

    const articles = await fetchAllArticles(startIndex, noOfRecommendations);
    expect(articles).toEqual(responseData);
  });
});