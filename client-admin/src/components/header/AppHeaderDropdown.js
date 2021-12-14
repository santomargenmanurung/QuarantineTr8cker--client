import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../../store/actionCreator/HistoriesAction'
// import avatar8 from './../../assets/images/avatars/8.jpg'

export default function AppHeaderDropdown ()  {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLogin}=useSelector((state)=> state.historiesReducer)
  const handleSubmit = (event) => {
    localStorage.clear()
   dispatch(setLogin(false))
window.location.reload()
}
console.log(isLogin, 'ini isLogin');

useEffect(() => {
  if (localStorage.access_token) {
   dispatch(setLogin(true))
  }
}, [localStorage.access_token]);
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar  color="primary" textColor="white">Adm</CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
          <CDropdownDivider />
        <CDropdownItem  onClick={handleSubmit}  >
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

// export default AppHeaderDropdown
