import React from 'react'
import { List, Label, Icon } from '@orchard/react-components'

// todo make list row more configurable, position and display individual components as needed


const ListRow = props => {
  const { id, iconName, header, description, labelText, onClick } = props;

  return (
    <List.Item className="list-item" key={id} onClick={onClick}>
      <div className="ui grid">
        <div className="two wide column">
          <Icon name={iconName} size="large" color="green"/>
        </div>
        <div className="ten wide column">
          <List.Content>
            <List.Header>{header}</List.Header>
            <List.Description>{description}</List.Description>
          </List.Content>
        </div>
        <div className="four wide column">
          <List.Content>
            <Label>{labelText}</Label>
          </List.Content>
        </div>
      </div>
    </List.Item>
  )
}

export default ListRow

