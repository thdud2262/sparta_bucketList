import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from 'react-redux'

import './BucketList.css';


const BucketList = (props) => {
    const bucket = useSelector((state)=> state.bucket.list)
    console.log(bucket)

    const history = useHistory();
    const my_wrap = React.useRef(null);
    // console.log(my_wrap)


    return ( 
        <div ref={my_wrap}>
            {bucket.map((B,i) =>{
                return (
                    <div className="bucketlist" key={ i } 
                        onClick={()=>{ history.push(`/detail/${i}`)}}
                    > { B } </div>
                )
            })}
        </div>
    )
}



export default BucketList;