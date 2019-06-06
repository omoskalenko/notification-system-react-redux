import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './style.css';

class Notification extends React.Component {

  defaultTimeout = 4000;
  timer = {}
  // i = 0;

  setTimeout(id) {
    if (this.timer[id]) return;
    // console.log(this.i++ , 'NOTIFY', 'setTimeout', id);
    this.timer[id] = setTimeout(() => {
      this.props.reset(id);
    }, this.props.timeout || this.defaultTimeout)

  }

  get notifyList() {
    return Object.keys(this.props.notifications)
  }

  handleClose = ({ target }) => {
    const notify = target.id;
    clearTimeout(this.timer[notify]);
    delete this.timer[notify];
    this.props.reset(notify);
  }

  getConfigByType(type) {
    switch (type) {
      case 'NOTIFICATION_SHOW':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>,
          style: {
            backgroundColor: '#396ea8',
          },
        }
      case 'NOTIFICATION_SUCCESS':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.77 5.03l1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z"/></svg>,
          style: {
            backgroundColor: '#2ecc71',
          }
        }
      case 'NOTIFICATION_ERROR':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /></svg>,
          style: {
            backgroundColor: '#e74c3c',
          },
        }
      case 'NOTIFICATION_WARNING':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>,
          style: {
            backgroundColor: '#ff9c24',
          }
        }
      case 'NOTIFICATION_INFO':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24"><path d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 0h-2v-2h2v2zm0-4h-2V8h2v4zm-1 10c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>,
          style: {
            color: '#333',
            border: '1px solid #396ea8s',
            backgroundColor: '#eee',
          }
        }

    }
  }

  appendNotification(notifyBlock) {
    return ReactDOM.createPortal(
      <Fragment>
        {this.notifyList.map(notify => {
          const config = this.getConfigByType(this.props.notifications[notify].type)
          this.setTimeout(notify);
          return <div
            id={notify}
            className="notification"
            key={notify}
            style={config.style}
            onClick={this.handleClose}
          >
            <i>{config.icon}</i>
            {this.props.notifications[notify].message}
          </div>
        })}
      </Fragment>
      , notifyBlock)
  }

  render() {

    // console.log(this.i++ , 'NOTIFY', 'РЕНДЕР', this.props.notifications);

    if (this.notifyList.length === 0 || !this.props.notifications) return null;

    const notifications = document.querySelector('#notifications')
    const notifyBlock = document.createElement('div');

    if (!notifications) {
      notifyBlock.id = `notifications`
      document.body.appendChild(notifyBlock);
      return this.appendNotification(notifyBlock)
    } else {
      return this.appendNotification(notifications)
    }

  }
}

export default Notification;