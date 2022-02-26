import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBucketFB, loadBucketFB } from './redux/modules/bucket';
import { db } from './firebase'
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"

import styled from "styled-components";

import Detail from './Detail';
import BucketList from './BucketList';
import NotPage from './NotPage';
import Update from './Update';
import Progress from './Progress';

 
function App(){
  const dispatch = useDispatch();
  // const [list, setList] = useState (['영화보기', '리액트프로젝트 만들기', '책읽기'])

  React.useEffect(async()=>{
    // console.log(db) //firebase안에 데이터를 확인해봄
    dispatch(loadBucketFB())

  },[])
  
  const text = React.useRef(null)

  const add = () => {
    // console.log(text.current.value)
    const bucket = text.current.value
    // setList([...list, text.current.value ]
    if (bucket===""){
      window.alert('버킷리스트를 입력해주세요')
    } else {
      // dispatch(createBucket(bucket));
      dispatch(createBucketFB({text:bucket, check:false}));
    }
    text.current.value = ""
  }

  return (
    <React.Fragment>
        <Apps>
          <InputBox>
            <Input type='text' ref={text}/>
            <Button onClick={add}>추가</Button>
          </InputBox>

          <Contain>
            <Progress/>
            <Title>BucketList</Title>
              <Switch>
                <Route path='/' exact>
                  <BucketList />
                </Route>
                <Route path='/detail/:index'>
                  <Detail/>
                </Route>
                <Route path='/update/:index'>
                  <Update/>
                </Route>
                <Route>
                  <NotPage/>
                </Route>
              </Switch>
          </Contain>
          <button onClick={()=>{
            window.scrollTo({top:0, left:0, behavior:"smooth"})
          }}>위로가기</button>
        </Apps>
    </React.Fragment>
  );
}




const Apps = styled.div`
  backgroundColor: #f8f9fa;
  height: 100%;
  width: 100vw;
`;
const Contain = styled.div`
  width: 400px;
  height: 100%;
  margin: 30px auto;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #ffec99;
`;
const Title = styled.h2 `
  color: #f59f00;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
  margin-bottom: 30px;
`;
const InputBox = styled.div`
  width: 400px;
  margin: 20px auto;
`;
const Input = styled.input`
  width: 320px;
  height: 45px;
  border-radius : 5px;
  border: 1px solid gray;
  padding-left:15px;
`;

const Button = styled.button`
  width : 50px;
  margin-left : 10px;
  border: none;
  background: #ffec99;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor:pointer;
`;



export default App;



