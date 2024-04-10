import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
	try {
		await AsyncStorage.clear();
		console.log('AsyncStorage cleared successfully.');
	} catch (error) {
		console.error('Error clearing AsyncStorage:', error);
	}
};

export const AddClickedArticle = async (article, userId, readTime, scrollPercentage) => {
	try {
		// Retrieve user_id from AsyncStorage
		if (userId !== null) {
			// If user_id exists, get clicked_article_ids and timestamps
			let userData = await AsyncStorage.getItem(userId);
			if (userData === null) {
				// If no user data exists, initialize an empty object
				userData = { 
					clicked_article_ids: [], 
					timestamps: [], 
					read_times: [], 
					scroll_percentages: [] 
				};
			} else {
				// Parse the existing user data
				userData = JSON.parse(userData);
			}

			// Check if the article id already exists in the array
			const articleIndex = userData.clicked_article_ids.indexOf(article.article_id);
			if (articleIndex !== -1) {
				// Overwrite existing data with new data
				userData.timestamps[articleIndex] = getCurrentTimestamp(); // Use the custom timestamp function
				userData.read_times[articleIndex] = parseFloat(readTime);
				userData.scroll_percentages[articleIndex] = parseFloat(scrollPercentage.toFixed(1));

				// Save updated user data to AsyncStorage
				await AsyncStorage.setItem(
					userId,
					JSON.stringify(userData)
				);
				console.log('Article data overwritten successfully.');
			} else {
				// Add the current article_id to clicked_article_ids
				userData.clicked_article_ids.push(parseInt(article.article_id)); // Ensure integer
				userData.timestamps.push(getCurrentTimestamp()); // Use the custom timestamp function
				userData.read_times.push(parseFloat(readTime));
				userData.scroll_percentages.push(parseFloat(scrollPercentage.toFixed(1)));

				// Save updated user data to AsyncStorage
				await AsyncStorage.setItem(
					userId,
					JSON.stringify(userData)
				);
			}
		} else {
			console.log('User ID not found in AsyncStorage');
		}
	} catch (error) {
		console.error('Error saving clicked article ID:', error);
	}
};

// Function to get current timestamp in "YYYY-MM-DD HH:MM:SS" format
export const getCurrentTimestamp = () => {
	const now = new Date();
	return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
};

export const getScrollPercentage = async (userId, articleId) => {
	try {
		const userData = await AsyncStorage.getItem(userId);
		if (userData !== null) {
			const parsedUserData = JSON.parse(userData);
			const index = parsedUserData.clicked_article_ids.indexOf(articleId);
			if (index !== -1) {
				return parsedUserData.scroll_percentages[index];
			}
		}
		return null; // Return null if userId or articleId not found
	} catch (error) {
		console.error('Error retrieving scroll percentage:', error);
		return null;
	}
};

export const logAsyncStorageContents = async () => {
	try {
		// Retrieve all keys from AsyncStorage
		const keys = await AsyncStorage.getAllKeys();
		for (const key of keys) {
			// Retrieve data for each key
			const userData = await AsyncStorage.getItem(key);
			console.log(`${key}:`, JSON.parse(userData));
		}
	} catch (error) {
		console.error('Error logging AsyncStorage contents:', error);
	}
};

export const getUserHistory = async () => {
	try {
		// Retrieve all keys from AsyncStorage
		const keys = await AsyncStorage.getAllKeys();
		for (const key of keys) {
			// Retrieve data for each key
			const userData = await AsyncStorage.getItem(key);
			return JSON.parse(userData);
		}
	} catch (error) {
		console.error('Error logging AsyncStorage contents:', error);
	}
};
