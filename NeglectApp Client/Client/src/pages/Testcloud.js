import React,{useState} from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
//var hhe='dd5ururm';
export default function Testcloud(){
    const [imageselected,setimageselected]=useState('');
    const [imagelink,setimagelink]=useState('');
    const dispatch=useDispatch();
    const counter=useSelector(state=>state.counter)
const uploadimage=()=>{
    console.log(imageselected);
    const formData=new FormData()
    formData.append('file',imageselected);
    formData.append('upload_preset','dd5ururm')
    axios.post('https://api.cloudinary.com/v1_1/drimnkool/upload',formData).then((response)=>{
        setimagelink(response.data.secure_url)


    })

}
    return(
        <div className="hello">

            <input type="file" 
            
            onChange={(event)=>{setimageselected(event.target.files[0])}}
            />
            <button
            onClick={uploadimage}
            >upload</button>
            <img src={imagelink} alt="lets test" />

            <br />
            <h1>{counter}</h1>
<button

onClick={()=>{dispatch({type:'INCREMENT'})}}
>Increment</button>{"   "}
<button

onClick={()=>{dispatch({type:'DECREMENT'})}}
>Decrement</button>

        </div>
    )
}