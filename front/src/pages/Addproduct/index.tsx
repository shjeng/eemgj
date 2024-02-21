import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import CategoryButton from '../../components/CategoryButton';
import './style.css';
import CheckBox from '../../components/CheckBox';
import { useCookies } from 'react-cookie';
import { fileUploadRequest, salesBoardWriteRequest } from '../../apis';
import { count } from 'console';
import { SalesBoardWriteRequestDto } from '../../apis/request/board';
import { PostSalesBoardWriteResponseDto } from '../../apis/response/board';
import { ResponseDto } from '../../apis/response';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, SALES_BOARD_DETAIL } from '../../constant';
import useLoginUserStore from '../../stores/login-user-store';

const AddProduct = () => {

  const [cookies, setCookies] = useCookies();
  const {loginUser} = useLoginUserStore();
  const navigate = useNavigate();

  const won = ' ₩ ';  
  const titleRef = useRef<HTMLInputElement | null> (null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const tagInputRef = useRef<HTMLInputElement | null>(null);


  const [title, setTttle] = useState<string>('');
  const [content,setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 이미지 미리보기 url
  const [imageFiles,setImageFiles] = useState<File[]>([]);

  // effect: 처음 들어왔을 때  // 
  useEffect(()=>{
    // alert(cookies.accessToken + " / " + loginUser?.email)
    if(!cookies.accessToken){
      alert('로그인이 필요한 서비스입니다. ');
      navigate(MAIN_PATH());
      return
    }
  },[])

  // state: spread //
  const priceButtonRef = useRef<HTMLDivElement | null>(null);


  const [price, setPrice] = useState<number>(0);
  const [commaPrice, setCommaPrice] = useState<string>('0');
  // category checkbox //
  const [categorys,setCategorys] = useState<string[]>([]);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [electronic,setElectronic] = useState<string>('');
  const [car,setCar] = useState<string>('');
  const [sports,setSports] = useState<string>('');
  const [animal,setAnimal] = useState<string>('');
  const [beauty,setBeauty] = useState<string>('');
  const [clothes,setClothes] = useState<string>('');
  const [baby,setBabay] = useState<string>('');
  const [furniture,setFurniture] = useState<string>('');
  const [stuff,setStuff] = useState<string>('');
  const [etc,setEtc] = useState<string>('');

  // 거래방법
  const [transaction, setTransaction] = useState<string>('direct');
  const [direct, setDirect] = useState<string>('direct');
  const [delivery,setDelevery] = useState<string>('');
  const [noMatter, setNoMatter] = useState<string>('');

  const [priceSpread, setPriceSpread] = useState<boolean>(false);
  const [categorySpread, setCategorySpread] = useState<boolean>(false);
  const [transactionSpread,setTransactionSpread] = useState<boolean>(false);


  // event handler: 가격 버튼 클릭
  const onPriceButtonClickEvent = () => {
    setPriceSpread(!priceSpread);
    setCategorySpread(false);
    setTransactionSpread(false);
  }
  // 가격 입력 
  const onPriceChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    let temp = value.replaceAll(",", "");

    const numericRegex = /^[0-9]+$/;
    if(numericRegex.test(temp.charAt(temp.length-1))) {
      const removedCommaValue: number = Number(temp);
      setCommaPrice(removedCommaValue.toLocaleString());
    }
    return;
  };
  // 등록 버튼 클릭
  const onPriceKeyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Backspace' && commaPrice.length === 1){
      setCommaPrice('0');
      return;
    }
    if(event.key !== 'Enter') return;
    if(categorys.length !== 0){
      setPriceSpread(false);
      return;
    }
    onPriceRegiBtnClickEvent()
  }
  const onPriceRegiBtnClickEvent = () => {
    onCategoryButtonClickEvent();
  }

  useEffect(()=>{
    let temp = commaPrice.replaceAll(",",'');
    const removeComma: number = Number(temp);
    setPrice(removeComma);
  },[priceSpread]);



  // event handler: 카테고리 버튼 클릭
  const onCategoryButtonClickEvent = () => {
    setPriceSpread(false);
    setCategorySpread(!categorySpread);
    setTransactionSpread(false);
  }
  // 전자제품 체크박스
  const onElectronicChk = () => {
    if(electronic.length === 0){
      setCategoryCount(categoryCount+1);
      setElectronic("electronic");
      let newCategory = [...categorys];
      newCategory.push(electronic);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'electronic');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setElectronic('');
  }
  // 차량용품 체크박스
  const onCarChk = () => {
    if(car.length === 0){
      setCategoryCount(categoryCount+1);
      setCar("car");
      let newCategory = [...categorys];
      newCategory.push(car);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'car');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setCar('');
  }
  // 스포츠/레저 체크박스 
  const onSports = () => {
    if(sports.length === 0){
      setCategoryCount(categoryCount+1);
      setSports("sports");
      let newCategory = [...categorys];
      newCategory.push(sports);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'sports');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setSports('');
  }
  const onAnimals = () => {
    if(animal.length === 0){
      setCategoryCount(categoryCount+1);
      setAnimal("animal");
      let newCategory = [...categorys];
      newCategory.push(animal);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'animal');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setAnimal('');
  }
  const onBeauty = () => {
    if(beauty.length === 0){
      setCategoryCount(categoryCount+1);
      setBeauty("beauty");
      let newCategory = [...categorys];
      newCategory.push(beauty);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'beauty');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setBeauty('');
  }
  const onClothes = () => {
    if(clothes.length === 0){
      setCategoryCount(categoryCount+1);
      setClothes("clothes");
      let newCategory = [...categorys];
      newCategory.push(clothes);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'clothes');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setClothes('');
  }
  const onBaby = () => {
    if(baby.length === 0){
      setCategoryCount(categoryCount+1);
      setBabay("baby");
      let newCategory = [...categorys];
      newCategory.push(baby);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'baby');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setBabay('');
  }
  const onFurniture = () => {
    if(furniture.length === 0){
      setCategoryCount(categoryCount+1);
      setFurniture("furniture");
      let newCategory = [...categorys];
      newCategory.push(furniture);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'furniture');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setFurniture('');
  }
  const onStuff = () => {
    if(stuff.length === 0){
      setCategoryCount(categoryCount+1);
      setStuff("stuff");
      let newCategory = [...categorys];
      newCategory.push(stuff);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'stuff');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setStuff('');
  }
  const onEtc = () => {
    if(etc.length === 0){
      setCategoryCount(categoryCount+1);
      setEtc("etc");
      let newCategory = [...categorys];
      newCategory.push(etc);
      setCategorys(newCategory);
      return;
    }
    let newCategory = categorys.filter(c=> c !== 'etc');
    setCategorys(newCategory);
    setCategoryCount(categoryCount-1);
    setEtc('');
  }

  // event handler: 거래방법 버튼 클릭
  const onTransactionButtonClickEvent = () => {
    setPriceSpread(false);
    setCategorySpread(false);
    setTransactionSpread(!transactionSpread);
  }
  const onDirectChk = () => {
    if(direct.length === 0){
      setDirect("direct");
      setDelevery("");
      setNoMatter("");
      return;
    }
    setDirect('');
  }
  const onDeliveryChk = () => {
    if(delivery.length === 0){
      setDirect("");
      setDelevery("delivery");
      setNoMatter("");
      return;
    }
    setDelevery('');
  }
  const onNoMatterChk = () => {
    if(noMatter.length === 0){
      setDirect("");
      setDelevery("");
      setNoMatter("noMatter");
      return;
    }
    setNoMatter('');
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
    const images = event.target.files; // 선택한 파일 가져오기 
    let imagesUrlList:string[] = []; // 미리보기 list
    let getImageFiles:File[] = [];
    for(let i=0;i<images.length;i++){
      const currentImgUrl = URL.createObjectURL(images[i]); // 미리보기 만들어주기 
      imagesUrlList.push(currentImgUrl); // 미리보기 url 
      getImageFiles.push(images[i]); // 파일 담아주기. 
    }
    if(imagesUrlList.length > 10){
      imagesUrlList = imagesUrlList.slice(0,10);
      while(imageFiles.length < 11){
        getImageFiles.pop();
      }
      getImageFiles.slice(0,10);
    }
    setImageFiles(getImageFiles);
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

  // event handler: 작성 버튼 클릭
  const onRegistrationButtonClick = async() => {
    alert(imageFiles[0]);
    if(!loginUser) return;
    if(categoryCount===0){
      alert('카테고리를 선택해주세요.');
      return
    }
    if(categoryCount >3){
      alert('선택 가능한 카테고리의 수는 3개까지 입니다.');
      return;
    }
    const accessToken = cookies.accessToken;
    if(!accessToken) return;
    const imageUrls:string[] = [];
    alert(imageFiles[0]); // 이미 여기서부터 안 넘어옴.
    for(const file of imageFiles){
      const data = new FormData();
      data.append('file',file);
      const getUrl = await fileUploadRequest(data,accessToken);
      if(getUrl) imageUrls.push(getUrl);
    }
    alert("파일은 오케!" + imageUrls[0]);

    const address = loginUser.address;
    const requestBody:SalesBoardWriteRequestDto = {title,content,price,categorys,transaction,tags,imageUrls,address};
    salesBoardWriteRequest(requestBody,accessToken).then(salesBoardWriteResponse);
  }
  const salesBoardWriteResponse = (responseBody: PostSalesBoardWriteResponseDto | ResponseDto | null) => {  
    if(!responseBody) {
      alert('서버로부터 응답이 없습니다.');
      return;
    }
    const {code} = responseBody;
    if(code === 'VF') alert('유효성 검사 실패');
    if(code === 'NU') alert('존재하지 않는 회원');
    if(code === 'DBE') alert('데이터베이스 오류');
    if(code !== 'SU'){
      return;
    }
    const {boardId} = responseBody as PostSalesBoardWriteResponseDto;
    navigate(`${SALES_BOARD_DETAIL()}?boardId=${boardId}`); // 게시물 상세보기 페이지로 이동 
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
          {'현재 지역: '} {loginUser?.address}
        </div>
      </div>

      <div className='width-line'></div>

      <div className='addproduct-bottom'>
        <div className='middle-left'>

          <div className='middle-box-wrap'>
            <div className='category-button-box'>
              <CategoryButton text={'가격'} onClickButton={onPriceButtonClickEvent} spread={priceSpread}/>
              {priceSpread &&
                <div className='c-wrap price-wrap'>
                  <div className='category-label'>가격등록</div>
                  <div className='price-input-box'>
                    <div className='won'>{won}</div>
                    <input className='price-input' placeholder={'가격을 입력해주세요.'} value={commaPrice} onChange={onPriceChangeEvent} onKeyDown={onPriceKeyDownEvent}/>
                  </div>
                  <div className='category-input-button-box'>
                    <div className='category-input-button' onClick={onPriceRegiBtnClickEvent} ref={priceButtonRef}>{'등록'}</div>
                  </div>
                </div>
              }
            </div>
            <div className='category-button-box'>
              <CategoryButton text={'카테고리'} onClickButton={onCategoryButtonClickEvent} spread={categorySpread}/>
              {categorySpread &&
                <div className='c-wrap category-wrap'>
                  <div className='category-label'>카테고리(최대 3개)</div>
                  <div className='cateogory-checkbox-wrap'>
                    <CheckBox value={electronic} label='전자기기' onClick={onElectronicChk} />
                    <CheckBox value={car} label='차량용품' onClick={onCarChk} />
                    <CheckBox value={sports} label='스포츠/레저' onClick={onSports} />
                    <CheckBox value={animal} label='반려동물' onClick={onAnimals} />
                    <CheckBox value={beauty} label='미용용품' onClick={onBeauty} />
                    <CheckBox value={clothes} label='의류' onClick={onClothes} />
                    <CheckBox value={baby} label='아동용품' onClick={onBaby} />
                    <CheckBox value={furniture} label='가구' onClick={onFurniture} />
                    <CheckBox value={stuff} label='잡화' onClick={onStuff} />
                    <CheckBox value={etc} label='기타' onClick={onEtc} />
                  </div>
                </div>
              }
            </div>
            <div className='category-button-box'>
              <CategoryButton text={'거래방법'} onClickButton={onTransactionButtonClickEvent} spread={transactionSpread}/>
              {transactionSpread &&
                <div className='c-wrap transactions-wrap'>
                <div className='category-label'>거래방법</div>
                <div className='cateogory-checkbox-wrap'>
                  <CheckBox value={direct} label='직거래' onClick={onDirectChk} />
                  <CheckBox value={delivery} label='택배거래' onClick={onDeliveryChk} />
                  <CheckBox value={noMatter} label='상관없음' onClick={onNoMatterChk} />
                </div>
              </div>
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
          <div className='submit-button' onClick={onRegistrationButtonClick}>{'등록'}</div>
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