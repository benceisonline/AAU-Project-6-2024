import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to clear AsyncStorage
const clearAsyncStorage = async () => {
	try {
		await AsyncStorage.clear();
		console.log('AsyncStorage cleared successfully.');
	} catch (error) {
		console.error('Error clearing AsyncStorage:', error);
	}
};

export const AddClickedArticle = async (article, userId) => {
	try {
		// Retrieve user_id from AsyncStorage
		if (userId !== null) {
			// If user_id exists, get clicked_article_ids
			let clickedArticleIds = await AsyncStorage.getItem(userId);
			if (clickedArticleIds === null) {
				// If no clicked article ids exist, initialize an empty array
				clickedArticleIds = [];
			} else {
				// Parse the existing clicked article ids
				clickedArticleIds = JSON.parse(clickedArticleIds);
			}

			// Check if the article id already exists in the array
			if (!clickedArticleIds.includes(article.article_id)) {
				// Add the current article_id to clicked_article_ids
				clickedArticleIds.push(article.article_id);
				// Save updated clicked_article_ids to AsyncStorage
				await AsyncStorage.setItem(
					userId,
					JSON.stringify(clickedArticleIds.join(', '))
				);
			} else {
				console.log('Article ID already exists for the user');
			}
		} else {
			console.log('User ID not found in AsyncStorage');
		}
	} catch (error) {
		console.error('Error saving clicked article ID:', error);
	}
};

export const logAsyncStorageContents = async () => {
	try {
		// Retrieve all keys from AsyncStorage
		const keys = await AsyncStorage.getAllKeys();
		for (const key of keys) {
			// Retrieve data for each key
			const data = await AsyncStorage.getItem(key);
			console.log(`${key}:`);
			console.log(`{ clicked_article_ids: "${data}" }`);
		}
	} catch (error) {
		console.error('Error logging AsyncStorage contents:', error);
	}
};
