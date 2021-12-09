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
          <Routes>
            <Route path="/login" name="Login Page" element={<LoginPage/>} />
            {/* <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
            <Route path="/" name="Home" element={<DefaultLayout/>} />
            <Route path="/addUser" name="Add" element={<FormInput/>} />
          </Routes>
        </React.Suspense>
  );
}

export default App;
