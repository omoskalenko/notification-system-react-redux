import {
  NOTIFICATION_SHOW,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
  NOTIFICATION_WARNING,
  NOTIFICATION_INFO,
} from '../actions';

export const notification = store => next => action => {

  function getNotificationType(action) {
    if (action.type.includes('SHOW')) {
      return 'NOTIFICATION_SHOW';
    } else
      if (action.type.includes('SUCCESS')) {
        return 'NOTIFICATION_SUCCESS';
      } else
        if (action.type.includes('ERROR')) {
          return 'NOTIFICATION_ERROR';
        } else
          if (action.type.includes('WARNING')) {
            return 'NOTIFICATION_WARNING';
          }
          else
            if (action.type.includes('INFO')) {
              return 'NOTIFICATION_INFO';
            } else {
              return 'NOTIFICATION_INFO';
            }
  }

  if (action.payload && action.payload.message) {
    store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        [Date.now()]: {
          type: getNotificationType(action),
          message: action.payload.message
        }
      }
    })
  }

  return next(action)
}