import React from 'react'

const Dashboard = React.lazy(() => import('./views/TableHistory'))
const LogHistory = React.lazy(() => import('./views/TableHistory'))
// User
const Userlists = React.lazy(() => import('./views/UserLists'))
const AddUser = React.lazy(() => import('./views/addForm'))
const EditUser = React.lazy(() => import('./views/UserEdit'))
const AddLocation = React.lazy(() => import('./views/AddLocation'))
const Locations = React.lazy(() => import('./views/TableLocation'))




const routes = [
  { path: '/', name: 'Dashboard', component: LogHistory },
  { path: '/user/userLists', name: 'UserList', component: Userlists},
  { path: '/user/addUser', name: 'AddUser', component: AddUser},
  { path: '/user/editUser/:id', name: 'EditUser', component: EditUser},
  { path: '/addLocation', name: 'AddLocation', component: AddLocation, exact: true},
  { path: '/locations', name: 'Location', component: Locations},
  
]

export default routes
