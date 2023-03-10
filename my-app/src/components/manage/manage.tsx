import "./manage.css";
import React from "react";
import {useState, useEffect, useRef} from "react";
import {uploadDocuments} from "../../tools/imageuploader";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {useRecoilState, useRecoilValue} from "recoil";
import { currentimage } from "../../store";
import { Link } from "react-router-dom";


const Manage = () => {
    const [displayedImage, setDisplayedImage] = useRecoilState(currentimage);
    const [maskImage, setmaskImage] = useState("");
    const [isdalle2, setisdalle2] = useState(0);
    const updateImages = (newImages:any) => {   
        const images = uploadDocuments(Object.values(newImages.target.files), setDisplayedImage);   
        console.log("running"); 
        console.log(newImages);
    };

    const Input = styled('input')({
        display: 'none',
    });

    const showSpinner = () => {
       document.getElementById("spinner")!.hidden = false;
      }
      
    const removeSpinner = () => {
        document.getElementById("spinner")!.hidden = true;
      }
      


    const calldalle1 = async () => {
        
         const localprompt = (document.getElementById("promptbox")! as HTMLFormElement).value;
         //console.log(prompt);
         
         const params ={
            prompt: localprompt,
            image: displayedImage.path
         }

        showSpinner();
        const response = await axios.post('http://localhost:5000/dalle/transimage', params);
        const newimg = response.data.data;
        setDisplayedImage({path: newimg, id: 0});
        removeSpinner();
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
           image: displayedImage.path,
           mask: maskImage,
        }
       showSpinner();
       try{
           const response = await axios.post('http://localhost:5000/dalle/transimage2', params);
           const newimg = response.data.data;
           setDisplayedImage({path: newimg, id: 0});
           console.log(response);
       }catch(error){
           alert("something went wrong, make sure you click init before use f2!");
       }
       removeSpinner();
       setisdalle2(0);
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
       image: displayedImage.path
    }

   showSpinner();
   const response = await axios.post('http://localhost:5000/dalle/transimage3', params);
   const newimg = response.data.data;
   setDisplayedImage({path: newimg, id: 0});
   console.log(response);
   removeSpinner();
}

   const init = () => {
     setisdalle2(1);
     const image : any = document.getElementById("uploadimage");
     const canvas : any = document.getElementById("Canvas");
     const context = canvas.getContext("2d");
     canvas.width = image.width;
     canvas.height = image.height;
     context.drawImage(image, 0 ,0, canvas.width, canvas.height);
     setDisplayedImage({path: canvas.toDataURL(), id: 0});
     const imageData = context.getImageData(0,0, canvas.width, canvas.height);
     /*
     for(var i = 3; i<imageData.data.length;i+=4){
        if(i>288000){
        imageData.data[i] = 0;
        }
     }
     */
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
       setisdalle2(0);
       removeSpinner();
       const canvas : any = document.getElementById("Canvas");
    
       canvas.addEventListener('mousedown', function(evt: any){
        const context = canvas.getContext("2d");
        const imageData = context.getImageData(0,0, canvas.width, canvas.height);
        const mousePos = getMousePos(canvas, evt);
        const x = mousePos.x;
        const y = mousePos.y;
        console.log(x+","+y);
        if(x>=0 && y>=0){
        for(var i = 3; i<imageData.data.length;i+=4){
            for (var dify = 0; dify<20; dify++){
                for(var difx = 0; difx<20; difx++){
                   if(i>(x-difx)*4+(y-dify)*1600 && i<(x+difx)*4+(y-dify)*1600){
                   imageData.data[i] = 0;
                   }
                   if(i>(x-difx)*4+(y+dify)*1600 && i<(x+difx)*4+(y+dify)*1600){
                    imageData.data[i] = 0;
                    }
                }
            }
        }
       }
        context.putImageData(imageData, 0 ,0);
        setmaskImage(canvas.toDataURL());
       }, false);
   }, []);

    return(
       <div className = "main">
        <div className = "back">
         <Button variant="outlined">
                <Link to = "/"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Back
                </Link>
        </Button>
        </div>
        <div className = "imagebox">
            <div className = "left">
           <div className = "image">

               {displayedImage.id === 0 ? 
                <img id = "uploadimage" width={400} alt={'user inputted'} src={displayedImage.path} height={400}  /> :
               <img id = "uploadimage" width={400} alt={'user inputted'} src={"../images/"+displayedImage.path} height={400}  />
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
            <div className="spinner" id ="spinner"> <CircularProgress /></div>
            <div className = "prompt">
               <TextField
                    fullWidth
                    id="promptbox"
                    multiline
                    rows = {2}
                />
            </div>
                {  isdalle2==0 &&
                 <div className = "buttonbox">
                    <Button variant="outlined" component="span" onClick = {calldalle1} > F1 </Button>
                    <Button variant="outlined" component="span" onClick = {init} > F2 </Button>
                    <Button variant="outlined" component="span" onClick = {calldalle3} > F3 </Button>
                 </div>   
                }
                {
                    isdalle2 == 1 &&
                 <div className = "buttonbox">
                    <Button variant="outlined" component="span" onClick = {calldalle2} > Confirm </Button>
                 </div>   
                }
       </div>
    );
}

export default Manage;
