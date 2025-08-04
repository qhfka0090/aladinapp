import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { calculateItemTotal, validateCartItem } from '../utils/cartUtils';
import { useSpring, useTransition, animated } from 'react-spring';
import { ChevronDown, ChevronUp } from 'lucide-react';

function CartItem({item, onRemove, onQuantityChange}){
    const [{x, opacity}, set] = useSpring(()=>({x:0, opacity:1}))

    const handleRemove = useCallback(()=>{
        set({x:100, opacity:0});
        setTimeout(()=>{ onRemove(item.id)}, 300);
    },[ set, onRemove, item.id])

    const handleQuantityChange = useCallback((newQuantity)=>{
        if( newQuantity>=1 && newQuantity<=99 ){
            validateCartItem({...item, quantity:newQuantity})
            onQuantityChange(item.id, newQuantity); // 부모 컴포넌트의 수량 변경 함수 호출
        }
    },[item, onQuantityChange])

    /* const price = useMemo(()=>{
        Number(item.discountPrice || item.price) || 0
    },[item])한줄은 중괄호 생략가능 */
    const price = useMemo(()=> Number(item.discountPrice || item.price) || 0 , [item]);

    /* const total = useMemo(()=>{
        calculateItemTotal(item) || 0
    },[item]); 한줄은 중괄호 생략 가능 */
    const total = useMemo(()=> calculateItemTotal(item) || 0 , [item]); 

    return(
        <animated.div id='cart-item' 
                    style={{ transfrom:x.to(x=>`translate3d(${x}px, 0, 0),`),
                            opacity:opacity.to(o=>o), }}>
                <div className='thumb'>
                    <img src={item.image} alt={item.name} />
                </div>
                <div className='cartItem-info'>
                    <strong>{item.name}</strong>
                    <p className='cart-price'>{price.toLocaleString()} 원</p>
                    <div className='cart-quantity'>
                        <button className='minus' onClick={()=>{handleQuantityChange(item.quantity-1)}}> - </button>
                        <input type='number' value={item.quantity} min='1' max='99' onChange={(e)=>{handleQuantityChange(e.target.value)}} />
                        <button className='plus' onClick={()=>{handleQuantityChange(item.quantity+1)}}> + </button>
                    </div>
                    <p className='cartitem-shipping'>내일 아침 7시 출근전 배송</p>
                </div>
                <div className='del-button'>
                    <button className='remove' onClick={handleRemove}> X </button>
                </div>
            {/* <td className='thumb'>
                <img src={item.image} alt={item.name} />
            </td>
            <td className='product-info'>
                <strong>{item.name}</strong>
                <div>[옵션:{item.selectedColor}, {item.selectedSize}]</div>
            </td>
            <td className='quantity'>
                <input type='number' value={item.quantity} min='1' max='99' onChange={(e)=>{handleQuantityChange(e.target.value)}} />
                <button className='minus' onClick={()=>{handleQuantityChange(item.quantity-1)}}> - </button>
                <button className='plus' onClick={()=>{handleQuantityChange(item.quantity+1)}}> + </button>
            </td>
            <td className='price'> {price.toLocaleString()} 원 </td>
            <td className='total'> {total.toLocaleString()} 원 </td>
            <td className='del-button'>
                <button className='remove' onClick={handleRemove}> 삭제 </button>
            </td> */}
        </animated.div>
    )
}

function Cart(){
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items) || [];
    const [ showTotal, setShowTotal ] = useState(false);

    const handleRemove = useCallback((productId)=>{
        dispatch(removeFromCart(productId))
    },[dispatch]);

    const handleQuantityChange = useCallback((productId, newQuantity)=>{
        dispatch(updateQuantity({productId, quantity:newQuantity}));
    },[dispatch])

    const totalAmount = useMemo(()=>{
        if( !cartItems || cartItems.length===0 ) return 0;
        return cartItems.reduce((total, item)=>{
            const itemTotal = calculateItemTotal(item);
            return total + (itemTotal || 0)
        },0)
    },[cartItems])

    const totalQuantity = useMemo(()=>{
        if( !cartItems || cartItems.length===0 ) return 0;
        return cartItems.reduce((total, item)=>{

        },0)
    },[cartItems])

    // 초기상태, 시작상태, 최종상태, 고유식별 
    const transitions = useTransition( cartItems, {
        from:{ opacity:0, transform:'translate3d(100%, 0, 0)' },
        enter:{ opacity:1, transform:'translate3d(0%, 0, 0)' },
        leave:{ opacity:0, transform:'translate3d(-50%, 0, 0)' },
        keys:item=> item.id
    })

    const totalAnimation = useSpring({
        opacity:showTotal ? 1:0,
        transform:showTotal ? 'translateY(0)' : 'translateY(50px)'
    })

    useEffect(()=>{
        const timer = setTimeout(()=> setShowTotal(true), 500);
        return ()=> clearTimeout(timer);
    },[])

    if(!cartItems || cartItems.length===0){
        return(
            <div className='empty-cart'>
                <h2>장바구니</h2>
                <p>장바구니가 비어 있습니다.</p>
            </div>
        )
    }


    return(
        <div id='wrap'>
            <div id='container'>
                <div id='contents'>
                    <div className='titleArea'>
                        <h2>장바구니</h2>
                    </div>
                    <div className='basket'>
                        <div className='basket-header'>
                            <h2>알라딘 배송</h2>
                            <button className='title-btn'>
                                <ChevronDown className='right-icon' />
                            </button>
                        </div>
                        <div className='basket-item'>
                            {   transitions((style,item)=>(
                                <CartItem key={item.id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onQuantityChange={handleQuantityChange}
                                />
                            ))}
                        </div>
                        <div className='totalSummary'>
                            <div className=''>
                                <h4>총 상품수</h4>
                                <strong>개</strong>
                            </div>
                            <div className=''>
                                <h4>총 상품금액</h4>
                                <strong>{totalAmount.toLocaleString()}원</strong>
                            </div>
                            <div className='shipping-price'>
                                <h4>총 배송비</h4>
                                <strong> 0원</strong>
                            </div>
                            <div className='total-price'>
                                <h3>총 결제 예상 금액</h3>
                                <strong>{totalAmount.toLocaleString()}원</strong>
                            </div>
                        </div>
                        {/* <table summary='' className='order-element'>
                            <thead>
                                <tr>
                                    <th scope='col'>이미지</th>
                                    <th scope='col'>상품정보</th>
                                    <th scope='col'>수량</th>
                                    <th scope='col'>판매가</th>
                                    <th scope='col'>합계</th>
                                    <th scope='col'>선텍</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   transitions((style,item)=>(
                                    <CartItem key={item.id}
                                        item={item}
                                        onRemove={handleRemove}
                                        onQuantityChange={handleQuantityChange}
                                    />
                                ))}
                            </tbody>
                        </table> */}
                        {/* <animated.div  style={totalAnimation} className='totalSummary'>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col'><strong>총 상품금액</strong></th>
                                        <th scope='col'>총 배송비</th>
                                        <th scope='col'>결제예정금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>{totalAmount.toLocaleString()}원</strong></td>
                                        <td><strong> 0원</strong><span>무료</span></td>
                                        <td><strong>{totalAmount.toLocaleString()}원</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </animated.div> */}
                        <div className='total-order'>
                            <button onClick={()=>{}} className='btnEm'>선택상품주문</button>
                            <button onClick={()=>{}} className='btnSubmit'>전체상품주문</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;