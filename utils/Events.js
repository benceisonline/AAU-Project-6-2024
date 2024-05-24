import EventEmitter from 'events';

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Receiver of the event (listening for an event to happen)
export const onGoBackFromArticle = (callback) => {
  eventEmitter.on('goBackFromArticle', callback);
};

// Emit an event (sending that an event happened) 
export const emitGoBackFromArticle = (data) => {
  eventEmitter.emit('goBackFromArticle', data);
};

export const removeGoBackFromArticle = (callback) => {
  eventEmitter.removeListener('goBackFromArticle', callback);
}