import React, { useEffect, useState } from 'react';

const MessageRead = ({ item }) => {
  const [body, setBody] = useState('');

  useEffect(() => {
    console.log('item', item);
    getBodyAsync(item.body).then(setBody).catch(console.error);
  }, [item.body]);

  const getBodyAsync = (body) => {
    return new Promise((resolve, reject) => {
      body.getAsync(Office.CoercionType.Text, function (result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result.value);
        } else {
          reject(result.error);
        }
      });
    });
  };

  return (
    <div>
      <div id="item-id">{item.itemId}</div>
      <div id="item-subject">{item.subject}</div>
      <div id="item-internetMessageId">{item.internetMessageId}</div>
      <div id="item-from">{item.from.displayName} &lt;{item.from.emailAddress}&gt;</div>
      <div id="item-body">{body}</div>
    </div>
  );
};

export default MessageRead;