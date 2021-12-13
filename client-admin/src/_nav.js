import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilBuilding,
  cilSmile
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { cilSmilePlus } from '@coreui/icons'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavTitle,
    name: 'MENUS',
  },
  {
    component: CNavItem,
    name: 'View Log History',
    to: '/',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Staff Menus',
    to: '/user',
    icon: <CIcon icon={cilSmile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Staff lists',
        to: '/user/userLists',
      },
      {
        component: CNavItem,
        name: 'Add Staff',
        to: '/user/addUser',
      },
    ],
  },
  ,
 
  {
    component: CNavItem,
    name: 'Locations',
    to: '/locations',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  }
  
]

export default _nav
