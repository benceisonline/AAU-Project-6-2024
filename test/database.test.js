import { supabase } from '../utils/Supabase';
import { 
  storeUserIdInDb, 
  storeSessionIdInDB, 
  storeBehaviorInDB, 
  storeUserHistoryInDB, 
  updateUserHistoryInDB, 
  doesUserHistoryExists, 
  storePreppedDataForModelInDB 
} from '../utils/DatabaseFunctions';

jest.mock('../utils/Supabase', () => ({
  supabase: {
    from: jest.fn(),
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    eq: jest.fn(),
  },
}));

describe('DatabaseFunctions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeUserIdInDb', () => {
    it('should insert a user and return user_id', async () => {
      // Test data
      const mockUserId = '123';
      const mockUser = { user_id: mockUserId };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: [mockUser], error: null }),
      });

      // Assertion
      const userId = await storeUserIdInDb();
      expect(userId).toBe(mockUserId);
      expect(supabase.from).toHaveBeenCalledWith('User');
      expect(supabase.from('User').insert).toHaveBeenCalled();
    });

    it('should throw an error if insertion fails', async () => {
      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: null, error: 'Insertion failed' }),
      });

      // Assertion
      await expect(storeUserIdInDb()).rejects.toThrow('Insertion failed');
    });
  });

  describe('storeSessionIdInDB', () => {
    it('should insert a session and return session_id', async () => {
      // Test data
      const mockSessionId = '456';
      const mockSession = { session_id: mockSessionId };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: [mockSession], error: null }),
      });

      // Assertion
      const sessionId = await storeSessionIdInDB('123');
      expect(sessionId).toBe(mockSessionId);
      expect(supabase.from).toHaveBeenCalledWith('Session');
      expect(supabase.from('Session').insert).toHaveBeenCalled();
    });

    it('should throw an error if insertion fails', async () => {
      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ data: null, error: 'Insertion failed' }),
      });

      // Assertion
      await expect(storeSessionIdInDB('123')).rejects.toThrow('Insertion failed');
    });
  });

  describe('storeBehaviorInDB', () => {
    it('should insert behavior into the database', async () => {
      // Test data
      const mockBehavior = { session_id: '123', user_id: '456', article_id: '789' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });

      // Assertion
      await expect(storeBehaviorInDB(mockBehavior)).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('Behavior');
      expect(supabase.from('Behavior').insert).toHaveBeenCalledWith([mockBehavior]);
    });

    it('should throw an error if behavior session_id is null', async () => {
      // Test data
      const mockBehavior = { session_id: null, user_id: '456', article_id: '789' };

      // Assertion
      await expect(storeBehaviorInDB(mockBehavior)).rejects.toThrow();
    });

    it('should throw an error if insertion fails', async () => {
      // Test data
      const mockBehavior = { session_id: '123', user_id: '456', article_id: '789' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: 'Insertion failed' }),
      });

      // Assertion
      await expect(storeBehaviorInDB(mockBehavior)).rejects.toThrow('Insertion failed');
    });
  });
  
  describe('storeUserHistoryInDB', () => {
    it('should insert user history and not throw an error', async () => {
      // Test data
      const mockHistory = { user_id: '123', data: 'some data' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });

      // Assertion
      await expect(storeUserHistoryInDB(mockHistory)).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('History');
      expect(supabase.from('History').insert).toHaveBeenCalledWith([mockHistory]);
    });

    it('should throw an error if insertion fails', async () => {
      // Test data
      const mockHistory = { user_id: '123', data: 'some data' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: 'Insertion failed' }),
      });

      // Assertion
      await expect(storeUserHistoryInDB(mockHistory)).rejects.toThrow('Insertion failed');
    });
  });

  describe('updateUserHistoryInDB', () => {
    it('should update user history and not throw an error', async () => {
      // Test data
      const mockHistory = { user_id: '123', data: 'updated data' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        update: jest.fn().mockResolvedValue({ error: null }),
        eq: jest.fn().mockReturnThis(),
      });

      // Assertion
      await expect(updateUserHistoryInDB(mockHistory)).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('History');
      expect(supabase.from('History').update).toHaveBeenCalledWith([mockHistory]);
      expect(supabase.from('History').eq).toHaveBeenCalledWith('user_id', mockHistory.user_id);
    });

    it('should throw an error if update fails', async () => {
      // Test data
      const mockHistory = { user_id: '123', data: 'updated data' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        update: jest.fn().mockResolvedValue({ error: 'Update failed' }),
        eq: jest.fn().mockReturnThis(),
      });

      // Assertion
      await expect(updateUserHistoryInDB(mockHistory)).rejects.toThrow('Update failed');
    });
  });

  describe('doesUserHistoryExists', () => {
    it('should return true if user history exists', async () => {
      // Test data
      const mockUserId = '123';

      // Mocking supabase response
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [{ user_id: mockUserId }], error: null }),
        eq: jest.fn().mockReturnThis(),
      });

      // Assertion
      await expect(doesUserHistoryExists(mockUserId)).resolves.toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('History');
      expect(supabase.from('History').select).toHaveBeenCalledWith('user_id');
      expect(supabase.from('History').eq).toHaveBeenCalledWith('user_id', mockUserId);
    });

    it('should return false if user history does not exist', async () => {
      // Test data
      const mockUserId = '123';

      // Mocking supabase response
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [{ user_id: '456' }], error: null }),
        eq: jest.fn().mockReturnThis(),
      });

      // Assertion
      await expect(doesUserHistoryExists(mockUserId)).resolves.toBe(false);
      expect(supabase.from).toHaveBeenCalledWith('History');
      expect(supabase.from('History').select).toHaveBeenCalledWith('user_id');
      expect(supabase.from('History').eq).toHaveBeenCalledWith('user_id', mockUserId);
    });

    it('should throw an error if select fails', async () => {
      // Test data
      const mockUserId = '123';

      // Mocking supabase response
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: 'Select failed' }),
        eq: jest.fn().mockReturnThis(),
      });

      // Assertion
      await expect(doesUserHistoryExists(mockUserId)).rejects.toThrow('Select failed');
    });
  });

  describe('storePreppedDataForModelInDB', () => {
    it('should insert prepped data for model and not throw an error', async () => {
      // Test data
      const mockModelData = { feature: 'value' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      });

      // Assertion
      await expect(storePreppedDataForModelInDB(mockModelData)).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('LightFM');
      expect(supabase.from('LightFM').insert).toHaveBeenCalledWith([mockModelData]);
    });

    it('should throw an error if insertion fails', async () => {
      // Test data
      const mockModelData = { feature: 'value' };

      // Mocking supabase response
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: 'Insertion failed' }),
        });

        // Assertion
      await expect(storePreppedDataForModelInDB(mockModelData)).rejects.toThrow('Insertion failed');
    });
  });
});
