import React from 'react'; 
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
  topic: {
    backgroundColor: '#158A19',
    fontFamily: 'Work Sans',
    fontSize: '8px',
    fontWeight: 400
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
    // fontFamily: 'Work Sans',
    fontWeight: 400
  },
  journalistName: {
    color: '#020202',
    // fontFamily: 'Work Sans',
    fontSize: 16,
    fontWeight: 500,
  },
  newsTitle: {
    color: '#111010',
    fontSize: 18,
    fontWeight: 500,
  },
  newsCategory: {
    fontSize: 10, 
    fontWeight: 400, 
    color: '#fff'
  }
});

export const colors = {
  timeStamp: '#7B7676'
};

export const layout = StyleSheet.create({
  flexColumn: {
    display: 'flex', 
    flexDirection: 'column'
  },
  flexRow: {
    display: 'flex', 
    flexDirection: 'row'
  }
});