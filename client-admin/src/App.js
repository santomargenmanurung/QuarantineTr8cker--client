import logo from './logo.svg';
import React, { Component } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
// import LoginPage from './views/Login';
import { Authentication } from './navguard';
import DefaultLayout from './layout/DefaultLayout';
// import LoginPage from './views/Login.js';
const loading = (
  <div className="pt-3 text-center">
    <h1> LOADING....</h1>
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
function App() {
  const LoginPage = React.lazy(() => import('./views/Login.js'))
  // const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
  const FormInput = React.lazy(() => import('./views/addForm'))
  return (
    <React.Suspense fallback={loading}>
      <Routes>
        <Route path="/login" name="Login Page" element={<LoginPage />} />
        <Route path="/*" name="Home" element=
          {
            <Authentication>
              <DefaultLayout />
            </Authentication>
          } />

      </Routes>
    </React.Suspense>
  );
}

export default App;
