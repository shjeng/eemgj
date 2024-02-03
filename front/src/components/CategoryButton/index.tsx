import './style.css';

import React, { forwardRef } from 'react';

interface Props{
  text: string;
  onClickButton: ()=> void;
  spread: boolean
}

const CategoryButton = forwardRef<HTMLDivElement,Props>((props:Props , ref) => {

  const {text, spread} = props;
  const {onClickButton} = props;

  return (
  <div id='category-button' onClick={onClickButton}>
    <div className=''>{text}</div>
    <div className='icon-box-10-7'>
      {spread ? 
      <div className='icon spread'></div>:
      <div className='icon fold'></div>
      }
    </div>
  </div>
  );
});

export default CategoryButton;