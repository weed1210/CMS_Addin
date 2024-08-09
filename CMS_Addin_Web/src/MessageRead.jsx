/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import authService from './services/authService';
import LoginPage from './pages/loginPage';
import ProjectPage from './pages/projectPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const MessageRead = () => {
  const [item, setItem] = useState({});
  const [profile, setProfile] = useState('');

  useEffect(() => {
    setItem(Office.context.mailbox.item);

    authService.getProfile()
      .then((response) => {
        setProfile(response);
      });
  }, [])

  return (
    <div className="container mt-4">
      {
        profile
          ? (
            <div className="card">
              <div className="card-body">
                <ProjectPage item={item} />
              </div>
            </div>
          )
          : (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <LoginPage />
            </div>
          )
      }
    </div>
  )
};

export default MessageRead;