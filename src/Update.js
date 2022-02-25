import React from "react"
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateBucket } from "./redux/modules/bucket";

const Update = (props) => {
  const bucket_data = useSelector((state)=> state.bucket.list)
  const dispatch = useDispatch() 
  const history = useHistory()
  const params = useParams()
  // console.log(params)
  const idx = params.index
  const inputValue=bucket_data[idx].text


  const updateText = React.useRef(null)


  const complete=()=>{
    console.log('수정완료')
    let updateValue = updateText.current.value
    // console.log(updateValue)
    dispatch(updateBucket(idx,updateValue))
    history.push('/')
  }
  
  return(
    <React.Fragment>
      <Box>
        <Input ref={updateText} defaultValue={inputValue}/>
      </Box>
      <BtnBox>
        <Button onClick={()=>{ history.push('/') }}>메인으로</Button>
        <Button onClick={complete}>수정완료</Button>
      </BtnBox>
    </React.Fragment>
  )
}


const Box = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom : 30px;
`;
const Input = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding-left: 15px;
  font-size: 20px;
`;
const BtnBox = styled.div`
  width: 100%;
  text-align: center;
`;
const Button = styled.button`
  width : 100px;
  margin: 0 10px;
  border: none;
  background: white;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor:pointer;
`;

export default Update;