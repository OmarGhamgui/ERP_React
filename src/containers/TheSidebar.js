import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import img1 from "../assets/icons/logo_transparent.png"
const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeStateReducer.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={() => {
       dispatch({ type: 'set'})
      }}
    >
      <CSidebarBrand className="d-md-down-none" to="/">

       <img src={img1} alt="img" width="100px"/>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
