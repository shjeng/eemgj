import { useNavigate } from 'react-router-dom';
import './style.css';
import { LOGIN_PATH, MAIN_PATH } from '../../constant';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import useLoginUserStore from '../../stores/login-user-store';

//      header component      //
const Header = () => {
  
  const {loginUser,setLoginUser,resetLoginUser} = useLoginUserStore();

  // header-top 컴포넌트
  const HeaderTop = () => {
    
    const navigate = useNavigate();

    const onLoginButtonClickHandler = () => {
      navigate(LOGIN_PATH());
    }

    // component: SearchBox 컴포넌트    //
    const SearchBox = () => {


      //    state: 검색 버튼 요소 참조 상태    //
      const searchButtonRef = useRef<HTMLDivElement | null>(null);
      const inputRef = useRef<HTMLInputElement | null>(null);
      const [word, setWord] = useState<string>('');

      //    function: 검색 단어, Input 엔터처리, 검색 버튼 클릭 함수     // 
      const onInputBoxChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{ 
        const value = event.target.value;
        setWord(value);
      }
      const onInputBoxKeyDownHandelr = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        if(!inputRef.current) return;
        onSearchButtonClickHandler();
      }
      const onSearchButtonClickHandler = () => {
        if(!inputRef.current) return;
        if(!word) inputRef.current.focus();
        alert('나중에 api 연동해야됨.');
      }
      return (
        <>
        <div className='header-search-input-box'>
          <input className='header-search-input' ref={inputRef} type='text' placeholder='찾고 싶은 물품을 검색해 보세요!' onChange={onInputBoxChangeHandler} onKeyDown={onInputBoxKeyDownHandelr}/>
          <div ref={searchButtonRef} onClick={onSearchButtonClickHandler} className='input-icon icon-box'>
            <div className='icon header-search-icon'></div>
          </div>
        </div>
  
        </>
      );
    } // component: SearchBox 컴포넌트    //

    
    // header-top
    return(
    <>
        <div className='header-top'>
          <div className='header-left-box' onClick={onLogoClickHandler}>
            <div className='icon-box-big50'>
              <div className='icon header-logo-icon'></div>
            </div>
            <div className='header-logo-text'>{'뜨거'}</div>
          </div>

          <div className='header-middle-box'>
            <SearchBox />
          </div>
          <div className='header-right-box' >
          {loginUser ? 
            <div>마이페이지?</div> : 
            <div className='header-right-box-child' onClick={onLoginButtonClickHandler}>{'로그인/회원가입'}</div> 
          }
          </div>
        </div>
    </>
    );
  }

  // header-bottom 컴포넌트
  const HeaderBottom = () => {
    const [isMenuHovering, setIsMenuHovering] = useState<boolean>(false);
    const mouseHandlerOver = () => {
      setIsMenuHovering(true);
    }
    const mouseHandlerOut = () => {
      setIsMenuHovering(false);
    }
    return (
      <>
        <div className='header-bottom'>

          <div className='header-bottom-child'>
            <div className='icon-box13' onMouseOut={mouseHandlerOut} onMouseOver={mouseHandlerOver} >
              <div className={isMenuHovering ?'icon header-menu-color-icon' : 'icon header-menu-icon'}  ></div>
            </div>
            <div className={isMenuHovering ?'header-menubar-hover' :'header-menubar'}  onMouseOut={mouseHandlerOut} onMouseOver={mouseHandlerOver}>{'카테고리'}</div>
            <div className='header-menubar'>{'전체매물'}</div>
            <div className='header-menubar'>{'매물지도'}</div>
          </div>

          <div className={isMenuHovering ? 'menubar':'menubar-none'} onMouseOut={mouseHandlerOut} onMouseOver={mouseHandlerOver}>
            
            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-electronic-icon'></div>
              </div>
              <div className='icon-box-text'>{'전자기기'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-car-icon'></div>
              </div>
              <div className='icon-box-text'>{'차량용품'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-sport-icon'></div>
              </div>
              <div className='icon-box-text'>{'스포츠/레저'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-dog-icon'></div>
              </div>
              <div className='icon-box-text'>{'반려동물'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-cosmetic-icon'></div>
              </div>
              <div className='icon-box-text'>{'뷰티/미용'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-cloth-icon'></div>
              </div>
              <div className='icon-box-text'>{'의류'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-baby-icon'></div>
              </div>
              <div className='icon-box-text'>{'아동'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-furniture-icon'></div>
              </div>
              <div className='icon-box-text'>{'가구'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-jobhwa-icon'></div>
              </div>
              <div className='icon-box-text'>{'잡화'}</div>
            </div>

            <div className='menubar-category'>
              <div className='icon-box'>
                <div className='icon header-etc-icon'></div>
              </div>
              <div className='icon-box-text'>{'기타'}</div>
            </div>

          </div>
        </div>
      </>
    )
  }
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }


  return (
  <>
    <div id="header">
      <div className='header-container'>

        <HeaderTop />
        <HeaderBottom />

      </div>
    </div>
  </>
  )

}

export default Header;