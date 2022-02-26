import { db } from '../../firebase'
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"


// Actions
const LOAD = 'bucket/LOAD';
const CREATE = 'bucket/CREATE';
const UPDATE = 'bucket/UPDATE';
const REMOVE = 'bucket/REMOVE';
const CHECKED = 'bucket/CHECKED';



// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
export function createBucket(bucket) {
  return { type: CREATE, bucket };
}
export function updateBucket(bucket_index, bucket) {
  return { type: UPDATE, bucket_index, bucket };
}
export function removeBucket(bucket_index) {
  return { type: REMOVE, bucket_index };
}
export function checkBucket(bucket_index) {
  return { type: CHECKED, bucket_index };
}


//initialState
const initialState = {
  list : [
    // {text: '영화보기', check: false},
    // {text: '리액트프로젝트 만들기', check: false},
    // {text: '책읽기', check: false},
  ],
  // list : ['영화보기', '리액트프로젝트 만들기', '책읽기'],
}


// middleware : firebase랑 통신하는 함수
// firestore에서 데이터 가져오는 함수 = 비동기통신
export const loadBucketFB = () => {
  return async function(dispatch) {
    const bucket_data = await getDocs(collection(db,"data"));
    let bucket_list = [];
    bucket_data.forEach((doc)=>{
      // console.log(doc.data())
      bucket_list.push({id:doc.id, ...doc.data()})
      // 데이터 고유의 id는 firestore에서 가지고있기 때문에 데이터를 불러오기 할 때, 넣어줘라!
    })
    // console.log(bucket_list)
    dispatch(loadBucket(bucket_list))
  }
}

export const createBucketFB = (bucket) =>{
  return async function(dispatch) {
    // console.log(bucket)
    const docRef = await addDoc(collection(db,"data"), bucket)
    const _bucket = await getDoc(docRef)
    const bucket_data = {id: _bucket.id, ..._bucket.data()}
    // docRef는 참조하기 위한 값, data를 보기 위해서는 getDoc으로 가져와야 함
    // console.log((await getDoc(docRef)).data())
    console.log(bucket_data)
    dispatch(createBucket(bucket_data))
  } 
}

export const checkBucketFB = (bucket_id) =>{
  return async function(dispatch, getState) {
    //수정할 데이터, 데이터 고유의 id ->
    // console.log(bucket_id)
    const docRef = doc ( db, "data", bucket_id )
    await updateDoc(docRef, { check: true })
    // 어떤 도큐먼트 수정해줄거니(정보넣기), 어떤거 수정할거니?
    // 위에는 firestore만 수정해줌

    console.log(getState().bucket)
    // 리덕스에 있는 데이터 확인하기
    // bucket_id를 받아왔으니까, id의 인덱스를 찾아서 업데이트해줌
    // array내장함수 findIndex사용 (id가 같은 index를 찾아서 출력해줘)
    // 리듀서에 인덱스를 보내 디스패치시킴
    const _bucket_list = getState().bucket.list
    const bucket_index = _bucket_list.findIndex((b)=>{
      return b.id === bucket_id
    })
    // console.log(bucket_index)
    dispatch(checkBucket(bucket_index))
  } 
}

export const removeBucketFB = (bucket_id) =>{
  return async function(dispatch, getState) {
    //수정할 데이터, 데이터 고유의 id ->
    console.log(bucket_id)
    const docRef = doc ( db, "data", bucket_id )
    await deleteDoc(docRef)
    // 위에는 firestore만 수정해줌

    console.log(getState().bucket)

    const _bucket_list = getState().bucket.list
    const bucket_index = _bucket_list.findIndex((b)=>{
      return b.id === bucket_id
    })
    console.log(bucket_index)
    dispatch(removeBucket(bucket_index))
  } 
}

export const updateBucketFB = (bucket_id, new_bucket) =>{
  return async function(dispatch, getState) {
    //수정할 데이터, 데이터 고유의 id ->
    console.log(bucket_id, new_bucket)
    const docRef = doc ( db, "data", bucket_id )
    console.log(docRef)
    await updateDoc(docRef, { text : new_bucket })
    // 위에는 firestore만 수정해줌

    const _bucket_list = getState().bucket.list
    console.log(_bucket_list)
    const bucket_index = _bucket_list.findIndex((b)=>{
      return b.id === bucket_id
    })
    console.log(bucket_index,)
    dispatch(updateBucket(bucket_index, new_bucket))
  } 
}


// Reducer                      // 파라미터에 = 기본값을 준다
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case "bucket/LOAD" : {
      console.log(state, action)
      const new_bucket_list = [...action.bucket_list];
      // console.log(new_bucket_list)
      return { list : new_bucket_list};
    }

    case "bucket/CREATE" : {
      // console.log(state, action)
      const new_bucket_list = [...state.list, action.bucket];
      // console.log(new_bucket_list)
      return { list : new_bucket_list};
    }

    case "bucket/REMOVE" : {
      console.log(state, action)
      const new_bucket_list = state.list.filter((l, idx) => {
        // state에 있는 data랑 action.bucket에 있는 데이터 비교해서 똑같은거 빼고 배열 만들기
        // filter의 결과는 T/F false인거 빼고 newArray만드는 함수
        // console.log(list, idx)
        // console.log(typeof(parseInt(action.bucket_index)))
        // console.log(typeof(idx))
        // console.log(action.bucket_index, idx, idx !== parseInt(action.bucket_index))
        return idx !== parseInt(action.bucket_index)
      })
      return { list : new_bucket_list };
    }

    case "bucket/UPDATE" : {
      console.log(state, action)
      const new_bucket_list = state.list.map((l, idx)=> {
        // console.log(l,idx)
        // console.log(l, action.bucket)
        // 리덕스에 있는 데이터랑 수정할 데이터를 비교함!으하하핳
        return idx === parseInt(action.bucket_index) ? {text:action.bucket, check:false} : l
      })
      // console.log(new_bucket_list)
      return {...state, list : new_bucket_list};
    }

    case "bucket/CHECKED" : {
      // console.log(state, action)
      const new_bucket_list = state.list.map((l, idx)=> {
        // console.log(l, idx, action.bucket_index)
        if (parseInt(action.bucket_index) === idx){
          return {...l, check: true}
        }else{
          return l
        }
      })
      // console.log(new_bucket_list)
      return {list : new_bucket_list};
    }
    default: return state;
    }
  }
  