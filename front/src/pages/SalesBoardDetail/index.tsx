import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.css';
const SalesBoardDetail = () => {

  const [mainImg, setMainImg] = useState<string>('');
  const [subImgs, setSubImgs] = useState<string[]>([]);
  
  const [query, setQuery] = useSearchParams();
  const boardId = query.get("boardId");
  useEffect(()=>{
    setSubImgs(['https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false',
    'https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false']);  
  },[boardId])
  return (
    <div id='sales-board-detail-wrap'>
      <div className='top'>
        <div className='top-left-img-box'>
          <div className='top-left-img' style={{background: `url(https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false)`}}></div>
          <div className='img-previous-button'></div>
          <div className='img-next-button'></div>
        </div>
        <div className='top-right-img-box'>
          {subImgs.map((subImg,index) => (
            <>
            {index<4 && 
            <div style={{background: `url(${subImg})`}}>dd</div>}
            {(subImgs.length > 4 && index === 4)&& <div>+{index}</div>}
            </>
          ))}
        </div>
      </div>

      <div>선</div>

      <div className='middle'>
        <div className='middle-left-text'>
          <div className='middle-left-top'></div>
          <div className='middle-left-middle'></div>
          <div className='middle-left-bottom'></div>
        </div>
        <div className='middle-right'>
          <div className='middle-right-button'>
            <div>관심상품</div>
            <div className='icon-box-3530'>
              <div className='icon favorite-icon'></div>
            </div>
          </div>
          <div className='middle-right-button'>
            <div>문의하기</div>
            <div className='icon-box-3530'>
              <div className='icon chatting-icon'></div>
            </div>
          </div>
        </div>
      </div>

      <div>선</div>

      <div className='bottom'>
        <div className='bottom-top'>
          <div className='profile-img'></div>
          <div className='profile-nickname'>아지르정시화</div>
          <div className='height-line'></div>
          <div className='borad-write-date'>2022. 05. 12.</div>
          <div className='icon-box-2420'>
            <div className='icon delete-button'></div>
          </div>
          <div className='icon-box-2420'>
            <div className='icon crystal-button'></div>
          </div>
        </div>

        <div className='bottom-title'>상품 설명</div>
        <div className='bottom-content'>개봉한지 얼마 안 된 상품입니다. A급! </div>
      </div>
    </div>
  );
};

export default SalesBoardDetail;