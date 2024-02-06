import React, { forwardRef } from 'react';
import './style.css'

interface Props{
  value: string;
  label: string;
  onClick: () => void;
}
const CheckBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) => {
  const {label,value} = props;
  const {onClick} = props;
  return (
  <div className='check-box' onClick={onClick}>
    {value.length !==0 ? 
    <div className='icon-box-20'>
        <div className='icon check'></div>
    </div> :
    <div className='no-check'></div> 

    }
    <div>{label}</div>
  </div>
  );
});

export default CheckBox;