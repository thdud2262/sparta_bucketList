

// Actions
const CREATE = 'bucket/CREATE';
const UPDATE = 'bucket/UPDATE';
const REMOVE = 'bucket/REMOVE';
const CHECK = 'bucket/CHECK';



// Action Creators
export function createBucket(bucket) {
  return { type: CREATE, bucket:bucket };
}
export function updateBucket(bucket_index, bucket) {
  return { type: UPDATE, bucket_index, bucket:bucket };
}
export function removeBucket(bucket_index) {
  return { type: REMOVE, bucket_index };
}
export function checkBucket(bucket_index) {
  return { type: CHECK, bucket_index };
}


//initialState
const initialState = {
  // list : ['영화보기', '리액트프로젝트 만들기', '책읽기'],
  // 완료하기의 T/F값을 체크하기위해 데이터를 list형태로 만들어줌
  list : [
    { text : "영화보러 가기", check : false },
    { text : "리액트프로젝트 만들기", check : false },
    { text : "책읽기", check : false },
  ],
}



// Reducer                      // 파라미터에 = 기본값을 준다
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE" : {
      // console.log(state, action)
      // console.log(state.list)
      // console.log(action.bucket)
      const new_bucket_list = [...state.list, {text:action.bucket, check:false}];
      // console.log({list : new_bucket_list})
      return { list : new_bucket_list};
    }

    case "bucket/REMOVE" : {
      // console.log(state)
      // console.log(action)
      const new_bucket_list = state.list.filter((l, idx) => {
        // state에 있는 data랑 action.bucket에 있는 데이터 비교해서 똑같은거 빼고 배열 만들기
        // filter의 결과는 T/F false인거 빼고 newArray만드는 함수
        console.log(action.bucket_index, idx, idx !== parseInt(action.bucket_index))
        return idx !== parseInt(action.bucket_index)
      })
      return { list : new_bucket_list };
    }
    
    case "bucket/UPDATE" : {
      console.log(state, action)
      const new_bucket_list = state.list.map((l, idx)=> {
        // console.log(l,idx)
        console.log(l, action.bucket)
        console.log(l.text)
        return idx === parseInt(action.bucket_index) ? {text:action.bucket, check:false} : l        
      })
      console.log(new_bucket_list)
      return {list : new_bucket_list};
    }
    
    case "bucket/CHECK" : {
      console.log(state, action)
      // const new_bucket_list = state.list.map((l, idx)=> {
      //   // console.log(l,idx)
      //   console.log(l, action.bucket)
      //   // 리덕스에 있는 데이터랑 수정할 데이터를 비교함!으하하핳
      //   return idx === parseInt(action.bucket_index) ? action.bucket : l.text
      // })
      // // console.log(new_bucket_list)
      // return {...state, list : new_bucket_list};
    }
    
    default: return state;
    }
  }
  