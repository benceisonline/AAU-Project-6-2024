import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  storeUserIdInDb,
  storeSessionIdInDB,
} from '../utils/DatabaseFunctions';
import {
  createUserId,
  fetchUserId,
  createSessionId,
  trackStartReading,
  getCurrentTimestamp
} from '../utils/AsyncFunctions';

// Mocking the global window object for localStorage
global.window = {};
global.window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(() => Object.keys(global.window.localStorage)),
  removeItem: jest.fn(),
};

// Mocking AsyncStorage and database functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

jest.mock('../utils/DatabaseFunctions', () => ({
  storeUserIdInDb: jest.fn(),
  storeSessionIdInDB: jest.fn(),
  storeBehaviorInDB: jest.fn(),
  storeOrUpdateUserHistory: jest.fn(),
  storePreppedDataForModelInDB: jest.fn(),
}));

describe('AsyncStorage Function Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
    global.window.localStorage.clear();
  });

  describe('createUserId', () => {
    it('should create a user ID and store it in AsyncStorage if it does not exist', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);
      storeUserIdInDb.mockResolvedValue('newUserId');

      await createUserId();

      expect(storeUserIdInDb).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userId', JSON.stringify('newUserId'));
    });

    it('should skip creating a user ID if it already exists', async () => {
      AsyncStorage.getItem.mockResolvedValue('existingUserId');

      await createUserId();

      expect(storeUserIdInDb).not.toHaveBeenCalled();
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  it('should fetch the user ID from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify('fetchedUserId'));

    const userId = await fetchUserId();

    expect(userId).toBe('fetchedUserId');
  });

  describe('createSessionId', () => {
    it('should create a session ID and store it in AsyncStorage', async () => {
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify('userId'));
      storeSessionIdInDB.mockResolvedValue('newSessionId');

      await createSessionId();

      expect(storeSessionIdInDB).toHaveBeenCalledWith('userId');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('sessionId', JSON.stringify('newSessionId'));
    });

    it('should throw an error if session ID creation fails', async () => {
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify('userId'));
      storeSessionIdInDB.mockResolvedValue(null);

      await expect(createSessionId()).rejects.toThrow('Session ID is null');
    });
  });

  it('should store the current timestamp as start reading time', async () => {
    const timestamp = getCurrentTimestamp();

    await trackStartReading();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('startReadTime', JSON.stringify(timestamp));
  });
});