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
    const updateImages = (newImages:any) => {   
        const images = uploadDocuments(Object.values(newImages.target.files), setDisplayedImage);   
        console.log("running"); 
        console.log(newImages);
    };

    const Input = styled('input')({
        display: 'none',
    });


    const calldalle = async () => {
        
         const localprompt = (document.getElementById("promptbox")! as HTMLFormElement).value;
         //console.log(prompt);
         const params ={
            image: displayedImage,
            prompt: localprompt
         }
        const response = await axios.post('http://localhost:5000/dalle/transimage', params);
        //const newimg = response.data.data;
        //setDisplayedImage(newimg);
        console.log(response);
       /*
       const response = await axios.get('http://localhost:5000/dalle/');
       console.log(response);
       */
    }

    return(
       <div className = "main">
           <div className = "image">

               {displayedImage.length === 0 ? <></> :
               <img width={400} alt={'user inputted'} src={displayedImage} height={400}  />
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
            <div className = "prompt">
               <TextField
                    fullWidth
                    id="promptbox"
                    multiline
                    rows = {2}
                />
            </div>
            <Button variant="outlined" component="span" onClick = {calldalle} > Confirm </Button>
       </div>
    );
}

export default Main;
