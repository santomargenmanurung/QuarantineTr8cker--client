import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from '../assets/8quarantine.jpeg'

import { AppSidebarNav } from './AppSidebarNav'


import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const {sidebarShow} = useSelector((state) => state.changeState)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        console.log(visible,'ini visibel');
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="" to="/">
        {/* <img src="../assets/8quarantine.jpeg"/> */}
      <CImage rounded thumbnail src={logo} width={200} height={100} />
      </CSidebarBrand>
      <CSidebarNav>
      {/* <SimpleBar> */}
          <AppSidebarNav items={navigation} />
        {/* </SimpleBar> */}
      </CSidebarNav>
      <CSidebarToggler
        className=""
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
