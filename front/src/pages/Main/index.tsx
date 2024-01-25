import './style.css'
import React from 'react';

const Main = () => {
  return (
    <div id="main">
      <div className='main-top-wrap'> 

        <div className='main-left-box'>
          <div className='main-left-box-big-text'>
            <div>{'우리동네'}</div>
            <div>{'커뮤니티!'}</div>
          </div>

          <div className='main-left-box-small-text'>{'이웃끼리 소통해요!'}</div>
          <div className='main-left-box-button-text'>{'우리동네 커뮤니티'}</div>
        </div>

        <div className='main-right-box'>
          <div className='main-right-box-background'></div>
        </div>

      </div>

      <div className='main-bottom-wrap'>

        <div className='main-bottom-left-box'>
          <div className='main-bottom-left-box-background'></div>
        </div>

        <div className='main-bottom-right-box'>
          <div className='main-right-box-big-text'>
              <div>{'우리동네'}</div>
              <div>{'중고거래'}</div>
          </div>

          <div className='main-bottom-right-box-bottom'>
            <div className='main-right-box-button-text'>
              <div className='icon-box38'>
                <div className='icon icon-white-logo'></div>
              </div>
              {'뜨거'}
            </div>
            <div className='main-left-box-small-text'>{'물건 보러 가기'}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Main;