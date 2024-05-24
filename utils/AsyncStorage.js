import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './Supabase';

const checkUserIdIsNull = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId === null; 
  } catch (error) {
    console.error('Error checking userId:', error);
    return true; 
  }
};

const storeUserId = async (userId) => {
  const { data, error } = await supabase
    .from('User')
    .insert([
      { user_id: userId },
    ])
    .select();

  if (error) {
    throw console.error(error);
  }
  
  try {
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
  } catch (error) {
    throw error;
  }
}

export const createUserId = async () => {  
  const userIdIsNull = await checkUserIdIsNull();

  if (!userIdIsNull)
    return

  const { data, error } = await supabase
    .from('User')
    .select('user_id')
    .order('user_id', { ascending: false })
    .limit(1);

  if (error) {
    throw console.error(error);
  }

  const userId = data[0].user_id + 1;

  storeUserId(userId);
}

export const fetchUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    throw error;
  }
}

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    throw error;
  }
}

export const fetchUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  } catch (error) {
    throw error;
  }
}