import "./main.css";
import React from "react";
import {useState, useEffect, useRef} from "react";
import {uploadDocuments} from "../../tools/imageuploader";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from "axios";

const Main = () => {
    const [displayedImage, setDisplayedImage] = useState("");
    const [maskImage, setmaskImage] = useState("");
    const updateImages = (newImages:any) => {   
        const images = uploadDocuments(Object.values(newImages.target.files), setDisplayedImage);   
        console.log("running"); 
        console.log(newImages);
    };

    const Input = styled('input')({
        display: 'none',
    });


    const calldalle1 = async () => {
        
         const localprompt = (document.getElementById("promptbox")! as HTMLFormElement).value;
         //console.log(prompt);
         
         const params ={
            prompt: localprompt,
            image: displayedImage
         }

        
        const response = await axios.post('http://localhost:5000/dalle/transimage', params);
        const newimg = response.data.data;
        setDisplayedImage(newimg);
        console.log(response);
       /*
       const response = await axios.get('http://localhost:5000/dalle/');
       console.log(response);
       */
    }
    const calldalle2 = async () => {

        const localprompt = (document.getElementById("promptbox")! as HTMLFormElement).value;
        //console.log(prompt);
        
        const params ={
           prompt: localprompt,
           image: displayedImage,
           mask: maskImage,
        }

       
       const response = await axios.post('http://localhost:5000/dalle/transimage2', params);
       const newimg = response.data.data;
       setDisplayedImage(newimg);
       console.log(response);
      /*
      const response = await axios.get('http://localhost:5000/dalle/');
      console.log(response);
      */
   }
   const calldalle3 = async () => {
        
    const localprompt = (document.getElementById("promptbox")! as HTMLFormElement).value;
    //console.log(prompt);
    
    const params ={
       prompt: localprompt,
       image: displayedImage
    }

   
   const response = await axios.post('http://localhost:5000/dalle/transimage3', params);
   const newimg = response.data.data;
   setDisplayedImage(newimg);
   console.log(response);
  /*
  const response = await axios.get('http://localhost:5000/dalle/');
  console.log(response);
  */
}

   const init = () => {
     const canvas : any = document.getElementById("Canvas");
     const image : any = document.getElementById("uploadimage");
     const context = canvas.getContext("2d");
     canvas.width = image.width;
     canvas.height = image.height;
     context.drawImage(image, 0 ,0, canvas.width, canvas.height);
     setDisplayedImage(canvas.toDataURL());
     const imageData = context.getImageData(0,0, canvas.width, canvas.height);
     for(var i = 3; i<imageData.data.length;i+=4){
        if(i>288000){
        imageData.data[i] = 0;
        }
     }
     console.log(imageData.data);
     context.putImageData(imageData, 0 ,0);
     setmaskImage(canvas.toDataURL());
   }

   const getMousePos = (canvas: any, evt: any) => {
     const rect = canvas.getBoundingClientRect();
     return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
     };
   }

   useEffect (() => {
       const canvas : any = document.getElementById("Canvas");
       canvas.addEventListener('mousemove', function(evt:any){
         const mousePos = getMousePos(canvas, evt);
         console.log("mouse position:"+mousePos.x+","+mousePos.y);
       }, false);
   }, []);

    return(
       <div className = "main">
        <div className = "imagebox">
            <div className = "left">
           <div className = "image">

               {displayedImage.length === 0 ? <></> :
               <img id = "uploadimage" width={400} alt={'user inputted'} src={displayedImage} height={400}  />
               }               

            </div>
            <div className = "content">
               <p>Please upload the image here! </p>
               <label htmlFor="contained-button-file">
               <Input onChange={updateImages}  id="contained-button-file" type="file" />
               {/*
               <Button   sx={{width: 80, height:60, background: '#5a82cf'}}>
                   <AddIcon sx={{color: 'white'}}/>
               </Button>
               */}
               <Button variant="outlined" component="span" > Upload </Button>
               </label> 
            </div>
            </div>
            <div className = "canvas">
                <canvas id="Canvas"></canvas>
            </div>
            </div>
            <div className = "prompt">
               <TextField
                    fullWidth
                    id="promptbox"
                    multiline
                    rows = {2}
                />
            </div>
            <div className = "buttonbox">
               <Button variant="outlined" component="span" onClick = {calldalle1} > F1 </Button>
               <Button variant="outlined" component="span" onClick = {calldalle2} > F2 </Button>
               <Button variant="outlined" component="span" onClick = {calldalle3} > F3 </Button>
               <Button variant="outlined" component="span" onClick = {init} > INIT </Button>
            </div>
       </div>
    );
}

export default Main;
