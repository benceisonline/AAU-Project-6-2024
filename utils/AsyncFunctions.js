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

const storeUserIdInDb = async (userId) => {
	if (userId === null) {
		console.error('User ID is null');
		return;
	}

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
    throw console.error(error);
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

  storeUserIdInDb(userId);
}

export const fetchUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return JSON.parse(userId);
  } catch (error) {
    throw console.error(error);
  }
}

export const createSessionId = async () => {
	const { data, error } = await supabase
    .from('Behaviors')
    .select('session_id')
    .order('session_id', { ascending: false })
    .limit(1);

	if (error) {
		throw console.error(error);
	}

	const sessionId = data[0].session_id + 1;

	try {
		await AsyncStorage.setItem('sessionId', JSON.stringify(sessionId));
	} catch (error) {
		throw console.error(error);
	}
};

const fetchSessionId = async () => {
	try {
		const sessionId = JSON.parse(await AsyncStorage.getItem('sessionId'));
		return sessionId;
	} catch (error) {
		throw console.error(error);
	}
};

const clearAsyncStorage = async () => {
	try {
		await AsyncStorage.clear();
		console.log('AsyncStorage cleared successfully.');
	} catch (error) {
		console.error('Error clearing AsyncStorage:', error);
	}
};

// fields:
// impression_id: int (primary key)
// user_id: int (foreign key)
// session_id: int (foreign key)
// article_id: int
// read_time: float
// scroll_percentage: float
// next_scroll_percentage: float
// next_read_time: float
// device_type: int
// gender: int
// postcode: int
// age: int
// is_sso_user: bool
// is_subscriber: bool
// impression_time: timestamp
// article_ids_clicked: int[]
// article_ids_inview: int[]
export const storeUserData = async (clickedArticle, articles, scrollPercentage) => {
	try {
		const sessionId = await fetchSessionId();
		const userId = await fetchUserId();
		const readtime = await trackEndReading();

		const articlesIds = [];
		articles.map(article => {
			articlesIds.push(article.article_id)
		});
		// articles.forEach(article => {
		// 		if (article.article_id !== articleId) {
		// 				articlesIds.push(article.article_id);
		// 		}
		// });

		const { data, error } = await supabase
			.from('Behaviors')
			.select('impression_id')
			.order('impression_id', { ascending: false })
			.limit(1);
		
		if (error) {
			throw console.error(error);
		}

		const impressionId = data[0].impression_id + 1;

		const behaviorData = {
			impression_id: impressionId,
			user_id: userId,
			session_id: sessionId,
			article_id: clickedArticle.article_id,
			read_time: readtime.readtime,
			scroll_percentage: scrollPercentage,
			next_scroll_percentage: null,
			next_read_time: null,
			device_type: 2,
			gender: null,
			postcode: null,
			age: null,
			is_sso_user: false,
			is_subscriber: false,
			impression_time: new Date(readtime.start),
			article_ids_clicked: [clickedArticle.article_id],
			article_ids_inview: articlesIds,
		};

		storeBehavior(behaviorData);
		storeBehaviorInDB(behaviorData);

		const userHistory = await updateUserHistory(userId, readtime.start, scrollPercentage, readtime.readtime, clickedArticle.article_id);
		storeUserHistory(userHistory);
		storeUserHistoryInDB(userHistory);

		storePreppedDataForModel(userId, clickedArticle, articles);
	} catch (error) {
		throw console.error(error);
	}
};

const storeBehavior = async (behavior) => {
	try {
		await AsyncStorage.setItem('behavior', JSON.stringify(behavior));
	} catch (error) {
		throw console.error(error);
	}
};

const fetchBehavioralData = async () => {
	try {
		const behavior = JSON.parse(await AsyncStorage.getItem('behavior'));
		return behavior;
	} catch (error) {
		throw console.error(error);
	}
};

export const trackStartReading = async () => {
	try {
		const timestamp = getCurrentTimestamp();
    await AsyncStorage.setItem('startReadTime', JSON.stringify(timestamp));
  } catch (error) {
    throw console.error(error);
  }
}

const trackEndReading = async () => {
	try {
		const startReadTime = JSON.parse(await AsyncStorage.getItem('startReadTime'));
		const timestamp = getCurrentTimestamp();

		const date1 = new Date(startReadTime);
		const date2 = new Date(timestamp);

		// Convert dates to milliseconds and subtract
		const differenceInMillis = date2.getTime() - date1.getTime();
		// Convert milliseconds to minutes
		const totalReadTime = (Math.abs(differenceInMillis / 60000)).toFixed(1);

		const readtime = {
			start: startReadTime,
			end: timestamp,
			readtime: totalReadTime,
		}

		return readtime;
  } catch (error) {
    throw console.error(error);
  }
}

const storeBehaviorInDB = async (behavior) => {
	if (behavior.session_id === null) {
		console.error('Session ID is null');
		return;
	}

	if (behavior.user_id === null) {
		console.error('User ID is null');
		return;
	}

	if (behavior.article_id === null) {
		console.error('Article ID is null');
		return;
	}

	const {data, error} = await supabase
		.from('Behaviors')
		.insert([behavior])
		.select();

	if (error) {
		throw console.error(error);
	}
}

// fields:
// user_id: int (foreign key/primary key)
// impression_time_fixed: timestamp[]
// scroll_percentage_fixed: float[]
// read_time_fixed: float[]
// article_id_fixed: int[]
const updateUserHistory = async (userId, impressionTime, scrollPercentage, readtime, articleId) => {
	try {
		let userHistory = await fetchUserHistoryData();
		let userHistoryData = {};

		if (userHistory ==! null) {
			const article_ids = userHistory.article_id_fixed;
			if (article_ids.includes(behavior.article_id)) {
				return;
			}

			const newImpressionTimes = [...userHistory.impression_time_fixed, new Date(impressionTime)];
			const newScrollPercentages = [...userHistory.scroll_percentage_fixed, parseInt(scrollPercentage)];
			const newReadTimes = [...userHistory.read_time_fixed, parseFloat(readtime)];
			const newArticleIds = [...userHistory.article_id_fixed, parseInt(articleId)];

			userHistoryData = {
				user_id: user_id,
				impression_time_fixed: newImpressionTimes,
				scroll_percentage_fixed: newScrollPercentages,
				read_time_fixed: newReadTimes,
				article_id_fixed: newArticleIds,
			};
		} else {
			userHistoryData = {
				user_id: userId,
				impression_time_fixed: [new Date(impressionTime)],
				scroll_percentage_fixed: [parseInt(scrollPercentage)],
				read_time_fixed: [parseFloat(readtime)],
				article_id_fixed: [parseInt(articleId)],
			};
		}

		return userHistoryData;
	} catch (error) {
		throw console.error(error);
	}
};

const storeUserHistory = async (history) => {
	try {
		await AsyncStorage.setItem('history', JSON.stringify(history));
	} catch (error) {
		throw console.error(error);
	}
};

const storeUserHistoryInDB = async (history) => {
	try {
		if (await doesUserHistoryExists(history.user_id)) {
			updateUserHistoryInDB(history);
			return;
		}
	} catch (error) {
		// Handle the error here
		console.error("Error checking user history:", error);
	}	

	const { data, error } = await supabase
		.from('History')
		.insert([history])
		.select();

	if (error) {
		throw console.error(error);
	}
}

const updateUserHistoryInDB = async (history) => {
	const { data, error } = await supabase
		.from('History')
		.update({ 
			impression_time_fixed: history.impression_time_fixed,
			scroll_percentage_fixed: history.scroll_percentage_fixed,
			read_time_fixed: history.read_time_fixed,
			article_id_fixed: history.article_id_fixed
		})
		.eq('user_id', history.user_id)

	if (error) {
		throw console.error(error);
	}
}

const doesUserHistoryExists = async (userId) => {
	const { data, error } = await supabase
		.from('History')
		.select('user_id')
		.eq('user_id', userId);

		if (error) {
      throw error;
    }

    return data[0].user_id === userId;
}

const fetchUserHistoryData = async () => {
	try {
		const userHistoryData = JSON.parse(await AsyncStorage.getItem('history'));
		return userHistoryData;
	} catch (error) {
		throw error;
	}
}

// fields:
// user_id: int (primary)
// item_id: int 
// rating: int
// genre: string 
const storePreppedDataForModel = async (userId, clickedArticle, articlesInView) => {
	const dataList = createDataList(userId, clickedArticle, articlesInView); 

	for (i = 0; i < articlesInView.length; i++) {
		storePreppedDataForModelInDB(dataList[i])
	}
}

const storePreppedDataForModelInDB = async (modelData) => {
	const { data, error } = await supabase
			.from('LightFM')
			.insert([modelData]);
		
	if (error) {
		console.error(error);
	}
}

const createDataList = (userId, clickedArticle, articlesInView) => {
	let dataList = [];

	articlesInView.forEach(article => {
		let rating = 0;
		if (article.article_id === clickedArticle.article_id) {
			rating = 1;
		}

		dataList.push({user_id: userId, item_id: article.article_id, rating: rating, genre: article.category_str})
	});

	return dataList;
}

// Function to get current timestamp in "YYYY-MM-DD HH:MM:SS" format
const getCurrentTimestamp = () => {
	const now = new Date();
	return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
};

export const logAsyncStorageContents = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys();
		for (const key of keys) {
			const userData = await AsyncStorage.getItem(key);
			console.log(`${key}:`, JSON.parse(userData));
		}
	} catch (error) {
		console.error('Error logging AsyncStorage contents:', error);
	}
};
