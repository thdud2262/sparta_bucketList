import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from 'react-redux'

import styled from "styled-components";


const BucketList = (props) => {
    const bucket = useSelector((state)=> state.bucket.list)
    console.log(bucket)

    const history = useHistory();
    const my_wrap = React.useRef(null);
    // console.log(my_wrap)


    return ( 
        <div ref={my_wrap}>
            {bucket.map((B,i) =>{
                console.log(B)
                return (
                    <ItemStyle 
                        is_check={B.check} 
                        key={ i } 
                        onClick={()=>{ history.push(`/detail/${i}`)}}
                    > { B.text } 
                    </ItemStyle>
                )
            })}
        </div>
    )
}

const ItemStyle = styled.div`
    width: 100%;
    height: 60px;
    margin-bottom: 15px;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 15px;
    box-sizing: border-box;
    line-height: 60px;
    cursor: pointer;
    background : ${(props) => (props.is_check? "#ffd43b;" : "white")};
    color : ${(props) => props.is_check? "white;" : "black"};
    text-shadow : ${(props) => props.is_check? "1px 1px 2px grey;" : null};
    font-weight : ${(props) => props.is_check? 600 : 400};


`;

export default BucketList;