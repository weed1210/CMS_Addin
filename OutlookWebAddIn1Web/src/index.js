import React from 'react';
import ReactDOM from 'react-dom';
import MessageRead from './MessageRead.jsx';

Office.onReady(async () => {
  const item = Office.context.mailbox.item;

  ReactDOM.render(<MessageRead item={item} />, document.getElementById('root'));
});