import { createSlice } from '@reduxjs/toolkit';
import { validateCartItem } from '../utils/cartUtils';
//로컬스토리지에서 장바구니 데이터 호출
const loadCartItem = () => {
    try{ // 진입, 로컬스토리지에서 'cartItems'키로 저장된 데이터 호출 시도
        const serializedCart = localStorage.getItem('cartItems');//로컬스토리지에서 아이템 가져오기
        if( serializedCart === null ){ // 진입은 했는데 값이 없으면
            return []; //데이터가 없으면 빈배열 반환
        }
        return JSON.parse(serializedCart) // 로컬스토리지에서 json 상태로 가져오기 JSON.parse, 현재 데이터를 JSON 문자열로 바꿔서 javascript객체로 변환 후 반환
    }catch(err) { // 아예 진입실패
        console.error('Error loading Cart items data', err);
        return []; // 없으면 빈배열로 호출.
    }
}
//장바구니 데이터를 로컬스토리지에 저장
const saveCartItems=(items)=>{
    try{
        // 자바스트립트 객체를 JSON문자열로 변환
        const serializedCart = JSON.stringify(items)
        // 로컬스토리지에 저장
        localStorage.setItem('cartItems',serializedCart);
    }catch(err) {
        console.error('Error Saving Cart Items', err);
    }
}
// Redux 슬라이스 생성 ( 상태, 액션들 정의 )
const cartSlice = createSlice({
    name:'cart', // 슬라이스 이름
    initialState:{ items:loadCartItem() }, // 초기상태를 로컬스토리지에서 호출한 데이터로
    reducers:{   // 상태 변경 리듀서 함수들(action) 정의
        addToCart:(state,action)=>{
            const newItem = action.payload; 
            try{
                validateCartItem(newItem);  // 제품 정보 유효검증
                // 동일상품 체크 ( 찾아서 있는 경우 수량 증가, 없다면 새로 배열 추가 )
                const existingItemIndex = state.items.findIndex( item => // index 찾기 -> 함수에 담아야 체크를 함
                    item.id===newItem.id /* && 
                    item.selectedColor===newItem.selectedColor && 
                    item.selectedSize===newItem.selectedSize */
                )
                if( existingItemIndex !== -1){ // 값이 있다면 == 같은 상품이 있다면 <0
                    state.items[existingItemIndex].quantity += newItem.quantity;
                }else{ // 동일상품이 없다면
                    state.items.push(newItem); // 새로운 배열 추가 - pust 배열 마지막에 추가
                }
                saveCartItems(state.items); // 그러고 마지막 로컬스토리지에 저장.
            } catch(err) {
                console.error('장바구니 제품추가 에러 :' , err.message);
            }            
        },
        removeFromCart:(state,action)=>{
            state.items=state.items.filter(item=>item.id!==action.payload); // 걸러서 이름이 같지 않은 애들만 배열에 담아라. (이름이 같은 애는 삭제), 전달받은 id와 다른 상품들만 필터링해서 새 배열 생성.
            saveCartItems(state.items);
        },
        updateQuantity:(state,action)=>{
            const {productId, quantity} = action.payload; // 수량하고 아이디만 가져옴, id와 수량을 가져와서 정의
            const item = state.items.find(item=> item.id===productId); // 같은 아이디 찾기, 해당 id 상품찾기
            if(item){ // 같은 이름이 있다면, 상품이 존재한다면
                item.quantity = quantity; // 새로 바뀐 숫자 넣어주기, 새로운 개수를 수량에 정의
                saveCartItems(state.items);
            }
        }
    }
})
// 액션 내보내기
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// 리듀서 내보내기(기본) -- 스토어 설정
export default cartSlice.reducer;