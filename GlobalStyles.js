import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
	plus: {
		backgroundColor: '#1C4EFF',
	},
	headerInactive: {
		backgroundColor: '#7A7373',
	},
	headerBackground: {
		backgroundColor: '#FCFCFC',
	},
	newsBackground: {
		backgroundColor: '#FEFEFE',
	},
	breakingNews: {
		backgroundColor: '#FAFF00',
		fontFamily: 'Karla',
		fontSize: '20px',
		fontWeight: 700,
	},
	timeStamp: {
		color: '#7B7676',
		fontFamily: 'WorkSans-Regular',
		fontWeight: 400
	},
	journalistName: {
		color: '#020202',
		fontFamily: 'WorkSans-Medium',
		fontSize: 14,
		},
	newsTitle: {
		color: '#111010',
		fontFamily: 'Karla-Medium',
		fontSize: 18,
		fontWeight: 500,
		letterSpacing: -0.5,
	},
	newsCategory: {
		fontSize: 10, 
		fontWeight: 400, 
		color: '#fff',
		textTransform: 'capitalize'
	},
	headline: {
		fontFamily: 'InterTight-SemiBold',
		fontSize: 32, 
		fontWeight: 'bold', 
		color: '#000'
	},
	subView: {
		fontFamily: 'InterTight-SemiBold',
		fontSize: 20, 
		fontWeight: 500, 
		color: '#7A7373'
	},
	bodyText: {
		fontSize: 16.5,
	},
	articleTitle: {
		fontSize: 24,
	},
	horizontalRedLine: {
		backgroundColor: 'red',
		borderRadius: 5,
		height: 4,
		position: 'absolute',
	}
});

export const colors = {
	timeStamp: '#7B7676'
};

export const errorScreen = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FCFCFC'
	},
	errorText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000'
	},
	button: {
		marginTop: '5%',
	}
});

export const layout = StyleSheet.create({
	flexColumn: {
		display: 'flex', 
		flexDirection: 'column'
	},
	flexRow: {
		display: 'flex', 
		flexDirection: 'row'
	},
	centeredRow: {  
		display: 'flex', 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	centeredColumn: {  
		display: 'flex', 
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
});