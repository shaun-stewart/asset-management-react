import React from 'react';
import Header  from "../Header";


const Page = props => {
  const {title, content, onBackClick, classNames = []} = props;

  return (
    <div className={[...classNames, 'page']}>
      <Header title={title} onBackClick={onBackClick}/>
      {content}
    </div>
  );
};

export default Page;

