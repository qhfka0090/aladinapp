// 장바구니 아이템의 유효성 검사 함수
export const validateCartItem = (item) => {
    if( !item.id && item.id !== 0 ) throw new Error(`제품은 구분아이디가 필요합니다. : ${item.id}`);/* ('제품은 구분아이디가 필요합니다.'); */
    if( !item.name ) throw new Error(`아이템에 이름은 필요합니다. : ${item.name}`);
    if( !item.price && item.price !==0 ) throw new Error(`제품 가격이 정확하지 않습니다. : ${item.price}`);
    if( !item.quantity || item.quantity<1 ) throw new Error(`최소수량이 선택되어야 합니다.:${item.quantity}`);
    //if( !item.selectedColor ) throw new Error(`색상 선택이 필요합니다. : ${item.selectedColor}`);
    //if( !item.selectedSize ) throw new Error(`크키선택이 필요합니다.:${item.selectedSize}`);
}

// 개별 상품의 총 가격 계산 함수
export const calculateItemTotal = (item) => {
    const price = Number(item.discountPrice || item.price)  || 0/* 할인가격이 있으면 앞에꺼 주고 없으면 원래가격주기, 문자로 판단될때 숫자로 바꿔주기 -> Number, 둘다 없으면 0원 */
    return price*(item.quantity || 1) /* 가격과 개수를 곱한 급액 산출해주기, 특정개수 없으면 1개 */
}

// 장바주기 전체 상품 총 가격 계산 함수
export const calculateCartTotal = (items) => {
    // 리덕스 ( 리듀서 호출 제어, 리듀서로 전체 item 호출, 계산 )
    if(!Array.isArray(items)){ return 0; } // 배열인 확인 함수 Array.isArray(~) : ~이 배열이 되는지 아닌지 확인하겠다. 
    return items.reduce((total,item)=> total+calculateCartTotal(item), 0) // total -> 누적 item -> 현재 할때 마다, calculateCatrTotal 개별 총 가격
    // 배열 데이터 요소 하나씩마다 누적 total 계산, 여기서 reduce는 -> map 함수 같은 개념 / 배열.reduce(함수) -> 누적계산할때 사용
}
