import React from "react"
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { removeBucket } from "./redux/modules/bucket";

const Detail = (props) => {

  const bucket_data = useSelector((state)=> state.bucket.list)
  console.log(bucket_data)
  const dispatch = useDispatch() 
  const history = useHistory()
  const params = useParams()
  const idx = params.index
  console.log(bucket_data[idx].text)

  const delBtn=()=>{
    console.log('삭제')
    dispatch(removeBucket(idx))
    history.push('/') 
  }
  const update=()=>{
    console.log('수정')
    history.push(`/update/${idx}`) 
  }
  const complete=()=>{
    console.log('완료')
    history.push(`/update/${idx}`) 
  }

  return(
    <React.Fragment>
      <Box>
        <D_Title>{bucket_data[idx].text}</D_Title>
        {/* <MainButton onClick={()=>{ history.push('/') }}>메인으로</MainButton> */}
      </Box>
      <BtnBox>
        <Button coClick={complete}>완료</Button>
        <Button onClick={delBtn}>삭제</Button>
        <Button onClick={update}>수정</Button>
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
const D_Title = styled.div`
  width: 100%;
  font-size: 20px;
  text-align : center;
  padding : 20px 10px;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  `;
const MainButton = styled.button`
  margin : 20px auto 0;
  padding: 5px 15px;
  border: none;
  background : white;
  border-radius: 5px;
  cursor: pointer;
`;
const BtnBox = styled.div`
  width: 100%;
  text-align: center;
`;
const Button = styled.button`
  width : 70px;
  margin: 0 5px;
  border: none;
  background: white;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor:pointer;
`;
export default Detail;
