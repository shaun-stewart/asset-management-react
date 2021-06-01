import React from 'react'
import { useDispatch } from "react-redux";

import { Menu } from "@orchard/react-components";
import ScreenMenu from './ScreenMenu'

import {routeJobList,routePropertySearch} from "../../actions"

const Header = props => {
  const { title, onBackClick } = props;

  const visible = true;
  const open = false;
  const dispatch = useDispatch();




  const renderSidebar = Item => {
    return (
      <React.Fragment>
        <Item header id="property-search" icon="search" onClick={() => dispatch(routePropertySearch())}>Property Search</Item>
      </React.Fragment>
    );
  }

  const onLogoClick = () => {
    dispatch(routeJobList());
  }



  return (
    <div className="header-title">
      <Menu {...{ renderSidebar, onLogoClick, visible, open }} />
      <ScreenMenu onBackClick={onBackClick} title={title}/>


    </div>
  )
}

export default Header
