import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import CategoryButton from '../../components/CategoryButton';
import './style.css';

const AddProduct = () => {
  const titleRef = useRef<HTMLInputElement | null> (null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTttle] = useState<string>('');
  const [content,setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 이미지 미리보기 url 

  const [priceSpread, setPriceSpread] = useState<boolean>(false);
  const [categorySpread, setCategorySpread] = useState<boolean>(false);
  const [transactionSpread,setTransactionSpread] = useState<boolean>(false);


  // event handler: 가격 버튼 클릭
  const onPriceButtonClickEvent = () => {
    setPriceSpread(!priceSpread);
  }
  // event handler: 카테고리 버튼 클릭
  const onCategoryButtonClickEvent = () => {
    setCategorySpread(!categorySpread);
  }
  // event handler: 거래방법 버튼 클릭
  const onTransactionButtonClickEvent = () => {
    setTransactionSpread(!transactionSpread);
  }

  // event handler: 제목  //
  const onTitleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const {value}= event.target;
    setTttle(value);
  }
  const onTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    contentRef.current?.focus();
  }
  // event handler: 상품 등록 content
  const onContentChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = event.target;
    setContent(value);
    if(!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;

  }




  // event handler: 이미지 아이콘 클릭 
  const onImgInputButtonClick = () => {
    imgInputRef.current?.click();
  }
  // event handler: 이미지 변경 이벤트 처리     //
  const onImageChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files || !event.target.files.length) return; 
    const images = event.target.files;
    let imagesUrlList = [...imageUrls];
    for(let i=0;i<images.length;i++){
      const currentImgUrl = URL.createObjectURL(images[i]);
      imagesUrlList.push(currentImgUrl);
    }
    if(imagesUrlList.length > 10){
      imagesUrlList = imagesUrlList.slice(0,10);
    }
    setImageUrls(imagesUrlList);
  }
  // event handler: 이미지 X 클릭 
  const onImageCloseClickEvent = (deleteIndex: number) => {
    const newImageUrls = imageUrls.filter((url,index) => index !== deleteIndex);
    setImageUrls(newImageUrls);
  }

  // event handler: tag     //
  const onTagChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if(value.length>10) return;
    setTag(value);
  }
  const onTagKeyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if( (event.key === 'Enter' || event.key === 'Tab') && tag.length !== 0){

      const newTags = [...tags];
      newTags.push(tag);
      setTag('');
      setTags(newTags);
      tagInputRef.current?.focus();
    } else if(event.key === 'Backspace'){
      const deleteTags = [];
      for(let i=0;i<tags.length-1;i++){
        deleteTags.push(tags[i]);
      }
      setTags(deleteTags);
      
    }
  }
  return (

  <>
  <div id="wrap">
    <div className='container'>
      <div className='top'>
        <div className='top-big-text'>
          {'상품등록'}
        </div>
        <div className='top-small-text'>
          {'현재 지역: '} {'지역~'}
        </div>
      </div>

      <div className='width-line'></div>

      <div className='bottom'>
        <div className='middle-left'>

          <div className='middle-box-wrap'>
            <div className='category-button-box'>
              <CategoryButton text={'가격'} onClickButton={onPriceButtonClickEvent} spread={priceSpread}/>
              {priceSpread &&
                <div className='price-wrap'>
                  <div className='price-input-box'>
                    <input className='price-input' placeholder={'가격을 입력해주세요.'} />
                  </div>
                  <div className='category-input-button-box'>
                    <div className='category-input-button'>{'등록'}</div>
                  </div>
                </div>
              }
            </div>
            <div className='category-button-box'>
              <CategoryButton text={'카테고리'} onClickButton={onCategoryButtonClickEvent} spread={categorySpread}/>
              {categorySpread &&
                <div></div>
              }
            </div>
            <div className='category-button-box'>
              <CategoryButton text={'거래방법'} onClickButton={onTransactionButtonClickEvent} spread={transactionSpread}/>
              {transactionSpread &&
                <div></div>
              }
            </div>
        </div>

        <div className='title-input-box'>
          <input className='title-input' placeholder={'제목을 입력해주세요.'} onChange={onTitleChangeEvent} value={title} ref={titleRef} onKeyDown={onTitleKeyDown}/>
          <div className='height-line'></div>

        </div>
        <div className='content-textarea-box'>
          <div className='textarea-box'>
            <textarea className='textarea' ref={contentRef} placeholder={'상품 설명을 적어주세요.'} value={content} onChange={onContentChangeEvent}/>
          </div>
          <div className='img-box'>
            {imageUrls.map((imgUrl,index) => (
            <div className='img-box-content'>
            <img className='img' src={imgUrl}/>
            <div className='icon-box18' onClick={()=>onImageCloseClickEvent(index)}><div className='icon close'></div></div>
          </div>
            ))}
          </div>
        </div>

        <div className='width-line'></div>

        <div className='tags-box'>
            {tags.map(t => <div className='tag'>#{t}</div>)}
            <input className='input' value={tag} ref={tagInputRef} placeholder={'태그를 입력해주세요. #가방 #신발'} onChange={onTagChangeEvent} onKeyDown={onTagKeyDownEvent}/>
        </div>
      </div>

      <div className='middle-right'>
          <div className='submit-button'>{'등록'}</div>
          <div className='middle-right-bottom'>
            <div className='icon-box-4137' onClick={onImgInputButtonClick}>
              <div className='icon img-button'></div>
              <input ref={imgInputRef} type='file' multiple accept='image/*' style={{display:'none'}} onChange={onImageChangeEvent}/> {/* accept='image/*' : 모든 이미지 파일 */}
            </div>
            <div>
              {imageUrls.length}
              /10
            </div>
          </div>
      </div>
    </div>
  </div>
</div>


</>
  )

};

export default AddProduct;