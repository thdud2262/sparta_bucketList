import React from "react"
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { removeBucket, checkedBucket } from "./redux/modules/bucket";

const Progress = (props) => {
  const bucket_list = useSelector((state)=> state.bucket.list)
  // console.log(bucket_list)

  let count = 0;
  bucket_list.map((B, idx) => {
    if(B.check){ count ++}})
  // console.log(count)
  // console.log(Math.round(count/(bucket_list.length)*100)+"%")

  return (
    <>
      <ProgressBar>
        <HighLight width={(count/(bucket_list.length)*100)+"%"}/>
      </ProgressBar>
    </>
  )
}

const ProgressBar = styled.div`
  background : #fff;
  width : 100%;
  height: 35px;
  border-radius: 20px;
`

const HighLight = styled.div`
  background : #f59f00;
  height: 35px;
  border-radius: 20px;
  width : ${(props) => (props.width? props.width : 0)};
  transition: 1s;
`
export default Progress;