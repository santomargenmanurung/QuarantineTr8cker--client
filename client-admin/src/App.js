import logo from './logo.svg';
import React, { Component } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
// import LoginPage from './views/Login';


const loading = (
  <div className="pt-3 text-center">
    <h1> LOADING....</h1>
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers

// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
function App() {
  const LoginPage = React.lazy(() => import('./views/Login.js'))
  const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
  const FormInput = React.lazy(() => import('./views/addForm'))
  return (
        <React.Suspense fallback={loading}>
          {/* <DefaultLayout/> */}
          <Routes>
            <Route path="/login" name="Login Page" element={<LoginPage/>} />
            <Route path="/*" name="Home" element={<DefaultLayout/>} />
           
          </Routes>
        </React.Suspense>
  );
}

export default App;
