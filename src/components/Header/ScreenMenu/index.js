import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Menu } from "@orchard/react-components";
import "./index.css";


const ScreenMenu = ({ title, onBackClick, buttons = [] }) => {
  return (
    <div className="ScreenMenu">
      <Menu.Embedded stackable>
        <Menu.Embedded.Item header>
          {onBackClick ?  <Icon name="nav-left-1" onClick={onBackClick} size="large" /> : null }

          <div className="screen-menu-title">{title}</div>
        </Menu.Embedded.Item>
        {!!buttons.length && (
          <Menu.Embedded.Item position="right">
            <Grid columns="equal" centered>
              {buttons.map(button => (
                <Grid.Column key={button.props.children}>{button}</Grid.Column>
              ))}
            </Grid>
          </Menu.Embedded.Item>
        )}
      </Menu.Embedded>
    </div>
  );
};

ScreenMenu.propTypes = {
  title: PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element)
};


export default ScreenMenu;
