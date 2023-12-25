import React,{useEffect, useRef} from 'react';
import "./Boardcss.css";
import html2canvas from 'html2canvas';

function Detector  () {
const canvasRef=useRef(null)

useEffect(

()=>{
  const canvas=document.getElementById("canvas");
     
   let context=canvas.getContext("2d");
   let start_background_color="white";
   context.fillStyle=start_background_color;
   context.fillRect(0,0,canvas.width,canvas.height)
   
let draw_color="black";
let draw_width="2";
let is_drawing=false;
let restore_array=[];
let index=-1;


canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);
   




function start(event){
  is_drawing=true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY- canvas.offsetTop);
  event.preventDefault();
}
function draw(event){
if(is_drawing){
  context.lineTo(event.clientX - canvas.offsetLeft, event.clientY- canvas.offsetTop)
  context.strokeStyle=draw_color;
  context.lineWidth=draw_width;
  context.lineCap="round";
  context.lineJoin="round";
  context.stroke();
}
event.preventDefault();
}
 function stop(event){
   if(is_drawing){
context.stroke();
context.closePath();
is_drawing=false;


}
event.preventDefault();
if(event.type!=="mouseout"){
restore_array.push(context.getImageData(0,0,canvas.width,canvas.height))
index+=1;}
 }  

const colorred=document.getElementById("red");
colorred.addEventListener("click",function(){
  draw_color="red";
});
const colorgreen=document.getElementById("green");
colorgreen.addEventListener("click",function(){
  draw_color="green";
});
const colorblue=document.getElementById("blue");
colorblue.addEventListener("click",function(){
  draw_color="blue";
});

const coloryellow=document.getElementById("yellow");
coloryellow.addEventListener("click",function(){
  draw_color="yellow";
});
const colorblack=document.getElementById("black");
colorblack.addEventListener("click",function(){
  draw_color="black";
});

const pick=document.getElementById('colorpicker');
pick.addEventListener('input', updatecolor);
function updatecolor(e) {
  draw_color = e.target.value;
}
const input=document.getElementById("range");
input.addEventListener('input', updateValue);

function updateValue(e) {
  draw_width = e.target.value;
}

const clearbutton=document.getElementById('clear');
clearbutton.addEventListener('click',clearAll)
function clearAll(e){
  context.fillStyle=start_background_color;
  context.clearRect(0,0,canvas.width,canvas.height)
  context.fillRect(0,0,canvas.width,canvas.height)
  restore_array=[];
  index=-1;
}
const undobutton=document.getElementById("undo");
undobutton.addEventListener('click',UndoLast);
function UndoLast(e){
if(index<=0){
  clearAll();

}
else{
  index-=1;
  restore_array.pop();
  context.putImageData(restore_array[index],0,0)
}
}

}


)
 

  return (
    <main className="mt-1">
    <div className="container-fluid">
    <div >
        <div>
<div id="mydiv" style={{width:'100%'}}>
          <canvas id="canvas" 
          width={1000}
          height={300}
          ref={canvasRef}
          
          >

          </canvas>
          </div>          <div className="tools">
            <button className="button" type="button"
            id="undo"
            
            >Undo</button>
            <button className="button" type="button"
            id="clear"
            >Clear</button>

            <div className="color-field" style={{backgroundColor:"red"}}
            id="red"
            
            
            ></div>
            <div className="color-field" style={{backgroundColor:"blue"}
            
          }
          id="blue"
          
          ></div>
            <div className="color-field" style={{backgroundColor:"green"}}
             id="green"
            
            ></div>
            <div className="color-field" style={{backgroundColor:"yellow"}}
             id="yellow"
            ></div>
             <div className="color-field" style={{backgroundColor:"black"}}
             id="black"
            ></div>
                <button 
    onClick={()=>{
      html2canvas(document.querySelector("#canvas")).then(canvas => {
        document.getElementById('output').appendChild(canvas);
    });
    }}
    >Click for ss</button>
  
  <input type="color" className="color-picker" id="colorpicker" />
  <input type="range"  min="1" max="100"  className="pen-range"
   id="range"
  />
          </div>
        </div>
    </div>
    </div>
<div id="output" className='pl-2'>


</div>

    <div>
      <img src="https://res.cloudinary.com/drimnkool/image/upload/v1636226834/sample.jpg" alt="ss" />
    </div>

    </main>
  );
}

export default Detector;            