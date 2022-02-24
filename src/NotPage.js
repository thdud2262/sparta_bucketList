import React from "react"
import styled from "styled-components";
import { useHistory } from "react-router-dom/";

const NotPage = (props) => {
  const history = useHistory()

  return(
    <>
    <Box>
      <Not>앗! 없는 페이지입니다</Not>
      <Button onClick={()=>{ history.push('/') }}>메인으로</Button>
    </Box>
    </>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Not = styled.div`
  width: 100%;
  font-size: 20px;
  text-align : center;
  padding : 20px 10px;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  `;
const Button = styled.button`
  margin : 20px auto 0;
  padding: 5px 15px;
  border: none;
  background : white;
  border-radius: 5px;
  cursor: pointer;
`;


export default NotPage;