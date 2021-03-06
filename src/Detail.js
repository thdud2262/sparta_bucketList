import React from "react"
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { removeBucketFB, checkBucketFB } from "./redux/modules/bucket";

const Detail = (props) => {

  const bucket_data = useSelector((state)=> state.bucket.list)
  const dispatch = useDispatch() 
  const history = useHistory()
  const params = useParams()
  const idx = params.index

  const delBtn=()=>{
    if (window.confirm('데이터를 삭제합니다')){
      dispatch(removeBucketFB(bucket_data[idx].id))
    }
    history.push('/') 
  }
  const update=()=>{
    console.log('수정')
    history.push(`/update/${idx}`) 
  }
  const checked=()=>{
    // console.log('완료')
    // console.log(bucket_data[idx].id)
    dispatch(checkBucketFB(bucket_data[idx].id))
    history.push('/') 
  }

  return(
    <React.Fragment>
      <Box>
        <D_Title>{bucket_data[idx] ? bucket_data[idx].text : ""}</D_Title>
        {/* <MainButton onClick={()=>{ history.push('/') }}>메인으로</MainButton> */}
      </Box>
      <BtnBox>
        <Button onClick={checked}>완료</Button>
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
  width : 50px;
  margin: 0 10px;
  border: none;
  background: white;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor:pointer;
`;
export default Detail;
