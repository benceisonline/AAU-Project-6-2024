import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeUserIdInDb, storeSessionIdInDB, storeBehaviorInDB, storeOrUpdateUserHistory, storePreppedDataForModelInDB } from './DatabaseFunctions';

const checkUserIdIsNull = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId === null; 
  } catch (error) {
    throw new Error('Error checking userId:', error);
  }
};

const storeUserIdInAsyncStorage = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
  } catch (error) {
    throw new Error(error);
  }
}

export const createUserId = async () => {  
  const userIdIsNull = await checkUserIdIsNull();

	// skip if user_id exists
  if (!userIdIsNull)
    return

  const userId = await storeUserIdInDb();

	if (userId === null) {
		throw new Error('User ID is null');
	}

	await storeUserIdInAsyncStorage(userId);
}

export const fetchUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return JSON.parse(userId);
  } catch (error) {
    throw new Error(error);
  }
}

export const createSessionId = async () => {
	const userId = await fetchUserId();
	const sessionId = await storeSessionIdInDB(userId);

	if (sessionId === null)
		throw new Error('Session ID is null');

	await storeSessionIdInAsyncStorage(sessionId);
}

const storeSessionIdInAsyncStorage = async (sessionId) => {
	try {
		await AsyncStorage.setItem('sessionId', JSON.stringify(sessionId));
	} catch (error) {
		throw new Error(error);
	}
};

const fetchSessionId = async () => {
	try {
		const sessionId = JSON.parse(await AsyncStorage.getItem('sessionId'));
		return sessionId;
	} catch (error) {
		throw new Error(error);
	}
};

const clearAsyncStorage = async () => {
	try {
		await AsyncStorage.clear();
		console.log('AsyncStorage cleared successfully.');
	} catch (error) {
		throw new Error('Error clearing AsyncStorage:', error);
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
		articles.forEach(article => {
			articlesIds.push(article.article_id);
		});

		const behaviorData = {
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

		await storeBehaviorInAsyncStorage(behaviorData);
		await storeBehaviorInDB(behaviorData);

		const userHistory = await updateUserHistoryData(userId, readtime.start, scrollPercentage, readtime.readtime, clickedArticle.article_id);
		await storeUserHistoryInAsyncStorage(userHistory);
		await storeOrUpdateUserHistory(userHistory);

		const modelDataList = createDataList(userId, clickedArticle, articlesInView);
		await storePreppedDataForModelInDB(modelDataList);
	} catch (error) {
		throw new error;
	}
};

const storeBehaviorInAsyncStorage = async (behavior) => {
	try {
		await AsyncStorage.setItem('behavior', JSON.stringify(behavior));
	} catch (error) {
		throw new Error(error);
	}
};

export const trackStartReading = async () => {
	try {
		const timestamp = getCurrentTimestamp();
    await AsyncStorage.setItem('startReadTime', JSON.stringify(timestamp));
  } catch (error) {
    throw new Error(error);
  }
}

export const trackEndReading = async () => {
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
    throw new Error(error);
  }
}

// fields:
// user_id: int (foreign key/primary key)
// impression_time_fixed: timestamp[]
// scroll_percentage_fixed: float[]
// read_time_fixed: float[]
// article_id_fixed: int[]
const updateUserHistoryData = async (userId, impressionTime, scrollPercentage, readtime, articleId) => {
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
				user_id: userId,
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
		throw new Error(error);
	}
};

const storeUserHistoryInAsyncStorage = async (history) => {
	try {
		await AsyncStorage.setItem('history', JSON.stringify(history));
	} catch (error) {
		throw new error;
	}
};


const fetchUserHistoryData = async () => {
	try {
		const userHistoryData = JSON.parse(await AsyncStorage.getItem('history'));
		return userHistoryData;
	} catch (error) {
		throw new Error(error);
	}
}

// fields:
// user_id: int (primary)
// item_id: int 
// rating: int
// genre: string 
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
export const getCurrentTimestamp = () => {
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
		throw new Error('Error logging AsyncStorage contents:', error);
	}
};