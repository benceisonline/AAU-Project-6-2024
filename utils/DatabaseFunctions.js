import { supabase } from './Supabase';

export const storeUserIdInDb = async () => {
  const { data, error } = await supabase
    .from('User')
    .insert({ created_ay: new Date() })

  if (error)
    throw new Error(error);

  return data[0].user_id;
}

export const storeSessionIdInDB = async (userId) => {
  const { data, error } = await supabase
    .from('Session')
    .insert({ user_id: userId, created_at: new Date() })

  if (error)
    throw new Error(error);

  return data[0].session_id;
}

export const storeBehaviorInDB = async (behavior) => {
  if (behavior.session_id === null)
		throw new Error('Session ID is null');

	if (behavior.user_id === null)
		throw new Error('User ID is null');

	if (behavior.article_id === null)
		throw new Error('Article ID is null');

  const { error } = await supabase
    .from('Behavior')
    .insert([behavior])

  if (error) {
    throw new Error(error);
  }
}

export const storeUserHistoryInDB = async (history) => {
  const { error } = await supabase
		.from('History')
		.insert([history]);

	if (error)
		throw new Error(error);
}

export const updateUserHistoryInDB = async (history) => {
	const { error } = await supabase
		.from('History')
		.eq('user_id', history.user_id)
		.update([history]);

	if (error)
		throw new Error(error);
}

export const doesUserHistoryExists = async (userId) => {
	const { data, error } = await supabase
		.from('History')
		.eq('user_id', userId)
		.select('user_id');

  if (error)
    throw new Error(error);

  return data[0].user_id === userId;
}

export const storeOrUpdateUserHistory = async (history) => {
	try {
		if (await doesUserHistoryExists(history.user_id)) {
			await updateUserHistoryInDB(history);
			return;
		}
	} catch (error) {
		throw new Error("Error checking user history:", error);
	}	

	await storeUserHistoryInDB(history);
}

export const storePreppedDataForModelInDB = async (modelData) => {
	const { error } = await supabase
			.from('LightFM')
			.insert([modelData]);
		
	if (error) 
		throw new Error(error);
}