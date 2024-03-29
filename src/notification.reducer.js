const initialState = {
  error: false,
  notifications: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload
        }
      }
    case 'NOTIFICATION_RESET':
      const newNotifications = state.notifications;
      delete newNotifications[action.payload];
      return {
        ...state,
        notifications: {
          ...newNotifications
        }
      }
    default:
      return state
  }
}