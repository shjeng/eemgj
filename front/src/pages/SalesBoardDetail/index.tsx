import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import { salesBoardDetailRequest } from '../../apis';
import { MAIN_PATH } from '../../constant';
import useLoginUserStore from '../../stores/login-user-store';
import { SalesBoardDetailResponseDto } from '../../apis/response/board';
import { ResponseDto } from '../../apis/response';
const SalesBoardDetail = () => {

  const navigate = useNavigate();
  const {loginUser} = useLoginUserStore();
  // state: SalesBoardDetail state    //
  const [board, setBoard] = useState<SalesBoardDetailResponseDto | null>(null);
  const [mainImg, setMainImg] = useState<string>('');
  const [mainImgIndex, setMainImgIndex] = useState<number>(0);
  // const [subImgs, setSubImgs] = useState<string[]>([]);
  const [price, setPrice] = useState<string>(); // 가격 콤마를 위한 
  const [mySalesBoard, setMySalesBoard] = useState<boolean>(false); // 내 게시물인지 확인함. 
  const [spread, setSpread] = useState<boolean>(false);

  const [query, setQuery] = useSearchParams();
  const boardId = query.get("boardId");

  // effect: 게시물 번호 바뀔 때 
  useEffect(()=>{
    if(boardId === null || boardId.length === 0){
      alert('존재하지 않는 게시물입니다.');
      navigate(MAIN_PATH());
      return;
    }
    salesBoardDetailRequest(boardId).then(salesBoardDetailResponse);
  },[boardId]) 
  const salesBoardDetailResponse = (responseBody: SalesBoardDetailResponseDto | ResponseDto | null) => {
    if(responseBody === null) return;
    const {code} = responseBody;
    if(code === 'VF') alert('유효성 검사 실패');
    if(code === 'NB') alert('존재하지 않는 게시물');
    if(code === 'DBE') alert('데이터베이스 오류');
    if(code !== 'SU'){
      navigate(MAIN_PATH());
      return;
    }
    const getBoard = {...responseBody as SalesBoardDetailResponseDto};
    setBoard(getBoard);
  
    let getPrice = getBoard.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(getPrice);
    let getEmail = getBoard.email;
    if(loginUser?.email === getEmail){
      setMySalesBoard(true);
    }

    let getBoardImg = getBoard.salesBoardImages;
    if(getBoardImg.length === 0) return;
    setMainImg(getBoardImg[0]);
    setMainImgIndex(0);
  } // useEffect 

  // function: SalesBoardDetail     //
  // 이미지 좌우버튼 클릭
  const onPreviousClick = () => {
    if(!board)return;
    let index = board.salesBoardImages.indexOf(mainImg);
    if(index===0) return;
    setMainImgIndex(index-1);
    setMainImg(board.salesBoardImages[index-1]);
  } 
  const onNextButtonClick = () => {
    if(!board)return;
    let index = board.salesBoardImages.indexOf(mainImg);
    if(index===board.salesBoardImages.length-1) return;
    setMainImgIndex(index+1);
    setMainImg(board.salesBoardImages[index+1]);
  }
  // 서브 이미지 클릭 시 
  const onSubImgClick = (index:number, url:string) => {
    if(!board) return;
    setMainImg(url)
    setMainImgIndex(index);
  }
  // + 페이지 펼치기 
  const onMoreImg = () => {
    setSpread(true);
  }
  
  // button //
  const FavoriteButton = ({ boardId }: { boardId: string|null }) =>{
    const onFavoriteButtonClick = () => {

    }
    return (           
    <div className='middle-right-button' onClick={onFavoriteButtonClick}>
      <div>관심상품</div>
      <div className='icon-box-3530'>
        <div className='icon favorite-icon'></div>
      </div>
    </div>)
    ;
  }

  const ChattingButton = () => {
    const onChattingButtonClick = () => {

    }
    return (
      <div className='middle-right-button' onClick={onChattingButtonClick}>
        <div>문의하기</div>
        <div className='icon-box-3530'>
          <div className='icon chatting-icon'></div>
        </div>
      </div>
    );
  } // button 
   
  if(!board) return <></>
  return (
    <div id='sales-board-detail-wrap'>
      {!spread && 
        <div className='spread-img-box'>
          {board.salesBoardImages.map(b => (
            <div className='spread-imgs' style={{backgroundImage:`url(${b})`}}></div>
          ))}
        </div>
      }
      <div className='top'>
        <div className='top-left-img-box'>
        <div className='top-left-img' style={{backgroundImage:`url(https://img2.joongna.com/cafe-article-data/live/2024/02/11/1039915625/1707631398470_002_XIqmd.jpg?impolicy=resizeWatermark3&isSecret=false)`}}></div>
        <div className='top-left-img' style={{backgroundImage:`url(${mainImg})`}}></div>
        {mainImgIndex > 0 && /**main 이미지의 위치가 0인 경우엔 버튼이 나타나면 안 됨. */
          <div className='img-previous-button icon-box-1320' onClick={onPreviousClick}>
            <div className='icon img-left-button'></div>
          </div>}
        {mainImgIndex < board.salesBoardImages.length && /** main 이미지의 인덱스가 마지막인 경우 */
          <div className='img-next-button icon-box-1320' onClick={onNextButtonClick}>
            <div className='icon img-right-button'></div>
          </div>
          }
        </div>
        
        <div className='top-right-img-box'>
          {board.salesBoardImages.map((subImg,index) => (
            <>
            {index<4 && 
            <div className={`subimgs ${subImg === mainImg && 'submain'}`} onClick={()=>onSubImgClick(index,subImg)} style={{backgroundImage: `url(${subImg})`}}></div>}
            {(board.salesBoardImages.length > 4 && index === 4)&& <div className='subimgs-index' onClick={onMoreImg}>+{index}</div>}
            </>
          ))}
        </div>
      </div>

      <div className='width-line'></div>

      <div className='middle'>
        <div className='middle-left-text'>
          <div className='middle-left-top'>
            {board.categorys.map((c,index)=>( /**카테고리 */
              <div>{c}</div> 
            ))}
            <div className='height-line'></div>
            <div>거래동네: {board.address}</div>
          </div>
          <div className='middle-left-middle'>{board.title}</div>
          <div className='middle-left-bottom'>
            <div className='middle-left-bottom-price'>{`₩${price}`}</div>
            {board.salesCompleted ? 
            <div className='middle-left-bottom-sales-completed'>{'판매완료'}</div>
            :
            <div className='middle-left-bottom-sales-no-completed'>{'판매중'}</div>
            }
          </div>
        </div>
        
        <div className='middle-right-sales-board-button'>
          <FavoriteButton boardId={boardId} />
          <ChattingButton />
        </div>
      </div>

      <div className='width-line'></div>

      <div className='bottom'>
        <div className='bottom-top'>
          <div className='profile-img' style={{backgroundImage:`url(https://opgg-static.akamaized.net/meta/images/lol/14.3.1/champion/Azir.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1707283412529)`}}></div>
          <div className='profile-nickname'>{board.nickname}</div>
          <div className='height-line-2'></div>
          <div className='borad-write-date'>{board.writeDateTime}</div>
          {mySalesBoard && /** 회원 정보와 일치하면 보여줌. 삭제와 수정 아이콘 */
          <>
          <div className='icon-box-2420'>
            <div className='icon delete-button'></div>
          </div>
          <div className='icon-box-2420'>
            <div className='icon crystal-button'></div>
          </div>
          </>
          }

        </div>

        <div className='bottom-content'>{board.content}</div>
      </div>
    </div>
  );
};

export default SalesBoardDetail;