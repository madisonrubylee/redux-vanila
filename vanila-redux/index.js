import { createStore } from "redux";
// console.log('hello parcel')

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 액션 
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

const toggleSwitch = () => ({ 
    type: TOGGLE_SWITCH 
})
const increase = difference => ({
     type: INCREASE, 
     difference
})
const decrease = () => ({ 
    type: DECREASE
})

const initialState = {
    toggle: false,
    counter: 0
};

// 리듀서 ; 변화를 일으키는 함수
function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state, //불변성 유지 
                toggle: !state.toggle 
            };
         case INCREASE: 
            return {
                ...state,
                counter: state.counter + action.difference 
            };
        case DECREASE: 
            return {
                ...state,
                counter: state.counter - 1 
            };
        default: 
            return state;
    }
}

const store = createStore(reducer);

// 상태 업데이트 될때마다 호출된다.
const render = () => {
    const state = store.getState(); 
    if (state.toggle) {
        divToggle.classList.add("active")
    } else {
        divToggle.classList.remove("active")
    }

    counter.innerText = state.counter
};

render();

//구독하기 ( 스토어의 상태가 변할때마다 render 함수 호출)
store.subscribe(render);

// 구독하기
const listener = () => {
    console.log("update requested");
}

const unsubscribe = store.subscribe(listener);
// 추후에는 subscribe 함수 대신 react-redux 라이브러리를 사용할 예정
// unsubscribe(); // 추후 구독을 비활성화 할 때 함수를 호출

// 디스패치 (액션 발생)
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
}

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}

btnDecrease.onclick = () => {
    store.dispatch(decrease());
};

