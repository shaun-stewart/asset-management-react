import React from 'react';


const Element = props => {
  const {name, onClick} = props;

  return (
    <div>
      <button onClick={onClick}>{'go to ' + name}</button>
    </div>
  );
};

export default Element;

