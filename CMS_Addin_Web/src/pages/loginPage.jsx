import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../services/authService';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../constants/auth';

const LoginPage = ({ setProfile }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    console.log(data);
    await authService.login(data)
      .then((res) => {
        localStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
        window.location.reload();
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="text"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;