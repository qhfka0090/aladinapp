import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { calculateItemTotal, validateCartItem } from '../utils/cartUtils';



function Product(){
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [ quantity, setQuantity ] = useState(1);

    const [ product, setProduct ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    useEffect(()=>{
        const fetchProduct = async () => {
            setIsLoading(true); // 데이터 로딩 시작
            setError(null);     // 기존 에러 초기화
            try {               // console.log( location.pathname, location.state ); // 개발 완료 후에는 삭제
                if( location.state && location.state.product ){      // location.state에 product 데이터가 있는 경우
                    setProduct(location.state.product);
                }else{
                    // location.state에 product 데이터가 없는 경우, API 호출하여 데이터를 가져옵니다.
                    console.log('제품 데이터 가져오는 중... (API 호출)');
                    const response = await fetch(`/api/products/${id}`); // 실제 API 경로로 변경 필요
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json(); // JSON 형태로 파싱
                    setProduct(data);
                }
            } catch (err) {
                console.error('제품 데이터 로딩 중 오류 발생:', err);
                setError('제품 정보를 불러오는 데 실패했습니다.'); // 사용자에게 보여줄 에러 메시지
                setProduct(null); // 에러 발생 시 product는 null로 유지
            } finally {
                setIsLoading(false); // 데이터 로딩 완료 (성공/실패 여부와 관계없이)
                console.log( location )
            }
        };

        fetchProduct();
    },[location.state, id]); // location.state를 의존성에 추가하여 라우터 state 변경 시에도 다시 실행 

    const handleQuantityChange = useCallback((change)=>{
        setQuantity(prevquantity=>Math.max(1,prevquantity+change));
    },[]);

    const totalPrice = useMemo(()=>{
        if (!product || typeof product.price !== 'number') return 0;
        return calculateItemTotal({...product, quantity});
    },[product, quantity]) 


    const handleAddCart = useCallback(()=>{
        if(!product){ return; }

        const cartItem = {
            id: id,
            name: product.title,            // discountPrice가 없으면 price 사용, price도 없으면 기본값 설정 (필요시)
            price: typeof product.discountPrice === 'number' ? product.discountPrice : (typeof product.price === 'number' ? product.price : 0),
            quantity: quantity,            // product.images 배열의 첫 번째 이미지 URL을 사용하도록 수정 (만약 imgObj가 아니라 URL 배열이라면 img를 직접 사용)
            image: product.img || '',
        }

        try{
            validateCartItem(cartItem); 
            dispatch(addToCart(cartItem)); 
            alert('제품정보를 장바구니에 전달 성공') 
            navigate('/cart'); 
        }catch(err){
            console.error('유효성 검사 에러', err.message);
        }
    },[dispatch, product, id, quantity, navigate]);

    if (isLoading) {
        return <div className='product-loading'>제품 정보를 불러오는 중...</div>;
    }
    if (error) {
        return <div className='product-error'>오류: {error}</div>;
    }
    if (!product) {
        return <div>제품데이터 없음</div>
    }


    return(
        <div id='product'>
            <div className='product-images'>
                {
                    product.img ? ( // product.img가 있으면 이미지 표시
                    <div className='img-box'>
                        <img src={product.img} alt={product.title || '제품 이미지'} />
                    </div>
                    ) : ( // 이미지가 없으면 기본 이미지 표시
                        <div className='img-box'>
                            <img src="https://via.placeholder.com/200?text=No+Image" alt="이미지 없음" />
                        </div>
                    )
                }
            </div>
            <div className='product-info'>
                <h2>{product.title}</h2>
                <div className='price'>
                    {/* price와 discountPrice가 숫자인지 확인 후 toLocaleString() 호출 */}
                    <span className='original-price'>
                        <p>정가</p>
                        {typeof product.price === 'number' ? product.price.toLocaleString() : '가격 정보 없음'}원
                    </span>
                    <span className='discount-price'>
                        <p>판매가</p>
                        {
                        typeof product.discountPrice === 'number' ? product.discountPrice.toLocaleString() :
                        (typeof product.price === 'number' ? product.price.toLocaleString() : '가격 정보 없음')
                        }
                        원
                    </span>
                </div>
                <div className='shipping'>
                    <div className='pro-item'>
                        <h4>수령예상일</h4>
                        <p>택배 주문시 내일 수령<br/>(중구 서소문로 89-31 기준)</p>
                    </div>
                    <div className='pro-item'>
                        <h4>배송료</h4>
                        <p>무료</p>
                    </div>
                    <div className='pro-item'>
                        <h4>전자책</h4>
                        <a href="#" className='pro-bell'>전자책 출간알림 신청</a>
                    </div>
                </div>
                <div className='quantity-selection'>
                    <h3>수량선택</h3>
                    <p>
                        <button onClick={()=>{handleQuantityChange(-1)}}> - </button>
                        <span>{ quantity } </span>
                        <button onClick={()=>{handleQuantityChange(1)}}> + </button>
                    </p>
                </div>
                <div className='total-price'>
                    <h3>TOTAL</h3> <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className='action-buttons'>
                    <button className='wishlist'>위시리스트</button>
                    <button className='add-to-cart' onClick={handleAddCart}>장바구니 담기</button>
                    <button className='buy-now'>즉시 구매</button>
                </div>
            </div>
        </div>
    )
}
export default Product;