import React, { useState } from 'react';
import CategoryButton from '../../components/CategoryButton';

const AddProduct = () => {
  const [priceSpread, setPriceSpread] = useState<boolean>(false);
  const [categorySpread, setCategorySpread] = useState<boolean>(false);
  const [transactionSpread,setTransactionSpread] = useState<boolean>(false);
  const onPriceButtonClickEvent = () => {

  }
  return (

  <>
  <div id="wrap">

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
          </div>
          <div className='category-button-box'>
            <CategoryButton text={'카테고리'} onClickButton={onPriceButtonClickEvent} spread={categorySpread}/>
          </div>
          <div className='category-button-box'>
            <CategoryButton text={'거래방법'} onClickButton={onPriceButtonClickEvent} spread={transactionSpread}/>
          </div>

      </div>

      <div className=''>
        <input />
      </div>
    </div>

    <div className='middle-right'>
        <div></div>
    </div>
  </div>
</div>
  </>
  )

};

export default AddProduct;