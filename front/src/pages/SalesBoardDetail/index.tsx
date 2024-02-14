import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import { salesBoardDetailRequest } from '../../apis';
import { MAIN_PATH } from '../../constant';
const SalesBoardDetail = () => {

  const FavoriteButton = () =>{
    return (           
    <div className='middle-right-button'>
      <div>관심상품</div>
      <div className='icon-box-3530'>
        <div className='icon favorite-icon'></div>
      </div>
    </div>)
    ;
  }
  const ChattingButton = () => {
    return (
      <div className='middle-right-button'>
        <div>문의하기</div>
        <div className='icon-box-3530'>
          <div className='icon chatting-icon'></div>
        </div>
      </div>
    );
  }
  const navigate = useNavigate();

  const [mainImg, setMainImg] = useState<string>('');
  const [subImgs, setSubImgs] = useState<string[]>([]);
  
  const [query, setQuery] = useSearchParams();
  const boardId = query.get("boardId");
  useEffect(()=>{
    if(boardId === null || boardId.length === 0){
      alert('존재하지 않는 게시물입니다.');
      navigate(MAIN_PATH());
      return;
    }
    setSubImgs(['https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false',
    'https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false','https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false']);  
    // salesBoardDetailRequest(boardId).then();
  },[boardId])
  return (
    <div id='sales-board-detail-wrap'>
      <div className='top'>
        <div className='top-left-img-box'>
        <div className='top-left-img' style={{backgroundImage:`url(https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false)`}}></div>
          <div className='img-previous-button icon-box-1320'>
            <div className='icon img-left-button'></div>
          </div>
          <div className='img-next-button icon-box-1320'>
            <div className='icon img-right-button'></div>
          </div>
        </div>
        
        <div className='top-right-img-box'>
          {subImgs.map((subImg,index) => (
            <>
            {index<4 && 
            <div className='subimgs' style={{backgroundImage: `url(${subImg})`}}></div>}
            {(subImgs.length > 4 && index === 4)&& <div className='subimgs-index'>+{index}</div>}
            </>
          ))}
        </div>
      </div>

      <div className='width-line'></div>

      <div className='middle'>
        <div className='middle-left-text'>
          <div className='middle-left-top'>
            <div>{'카테고리들'}</div>
            <div className='height-line'></div>
            <div>거래동네: {'수원'}</div>
          </div>
          <div className='middle-left-middle'>{'게시물 제목 올 자리 '}</div>
          <div className='middle-left-bottom'>
            <div className='middle-left-bottom-price'>{'₩10,000'}</div>
            <div className='middle-left-bottom-sales-completed'>{'판매완료'}</div>
          </div>
        </div>
        
        <div className='middle-right-sales-board-button'>
          <FavoriteButton />
          <ChattingButton />
        </div>
      </div>

      <div className='width-line'></div>

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