import { connect } from 'react-redux';
import {  } from '../actions';

import Notification from '../components/Blocks/Notification';

export default connect(
  (state) => ({
    notifications: state.notification.notifications,
  }),
  (dispatch) => ({
    reset: (id) => dispatch({
      type: 'NOTIFICATION_RESET',
      payload: id
    })
  })
)(Notification);