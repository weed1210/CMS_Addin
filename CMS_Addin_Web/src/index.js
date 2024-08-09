import React from 'react';
import ReactDOM from 'react-dom/client';
import MessageRead from './MessageRead.jsx';

Office.onReady(async () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<MessageRead />);
});