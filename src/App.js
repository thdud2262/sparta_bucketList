import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBucket } from './redux/modules/bucket';

import styled from "styled-components";

import Detail from './Detail';
import BucketList from './BucketList';
import NotPage from './NotPage';
import Update from './Update';


function App(){
  const dispatch = useDispatch();
  // const [list, setList] = useState (['영화보기', '리액트프로젝트 만들기', '책읽기'])
  const text = React.useRef(null)

  const add = () => {
    // console.log(text.current.value)
    const bucket = text.current.value
    // setList([...list, text.current.value ]
    bucket===""? window.alert('버킷리스트를 입력해주세요') : dispatch(createBucket(bucket));
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



