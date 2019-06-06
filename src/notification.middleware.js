import actionsTypes from '../actions';

export const notification = store => next => action => {

  function getNotificationType(action) {
    if (action.type.includes('SHOW')) {
      return actionsTypes.NOTIFICATION_SHOW;
    } else
      if (action.type.includes('SUCCESS')) {
        return actionsTypes.NOTIFICATION_SUCCESS;
      } else
        if (action.type.includes('ERROR')) {
          return actionsTypes.NOTIFICATION_ERROR;
        } else
          if (action.type.includes('WARNING')) {
            return actionsTypes.NOTIFICATION_WARNING;
          }
          else
            if (action.type.includes('INFO')) {
              return actionsTypes.NOTIFICATION_INFO;
            } else {
              return actionsTypes.NOTIFICATION_INFO;
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