const {Configuration, OpenAIApi} = require('openai');
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const imageToBase64 = require('image-to-base64');

const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
   
});
const openai = new OpenAIApi(configuration);


const transImage = async(req, res)=>{
    //const {reqprompt, reqimage} = req.body;
    console.log("generated 1 begin!!!!");
    const reqprompt = req.body.prompt;
    try{
        
       
       const response = await openai.createImage({
        prompt: reqprompt,
        n: 1,
        size: "256x256"
       });
        
        const imageUrl = response.data.data[0].url;

        imageToBase64(imageUrl).then(
            (response) => {
                const sendimg = "data:image/png;base64,"+response;
                res.status(200).json({
                    success: true,
                    data: sendimg,
                });
            }
        )


    } catch(error){
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        }else{
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: "The image could not be generated",
        });
    }
};

const transImage2 = async(req, res) => {
    //const {reqprompt, reqimage} = req.body;
    console.log("generated 2 begin!!!!");
    const reqprompt = req.body.prompt;
    const reqimage = req.body.image;
    const reqmask = req.body.mask;

    const base64data = reqimage.replace(/^data:image\/\w+;base64,/, "");
    const databuffer = Buffer.from(base64data, 'base64');
    fs.writeFile("./controllers/image.png", databuffer, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("success image");
        }
    });
 
    const base64datamask = reqmask.replace(/^data:image\/\w+;base64,/, "");
    const databuffermask = Buffer.from(base64datamask, 'base64');
    fs.writeFile("./controllers/mask.png", databuffermask, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("success mask");
        }
    });


    const maskpath = path.join(__dirname, 'mask.png');
    const imagepath = path.join(__dirname, 'image.png');

 
    try{
        
        const response = await openai.createImageEdit(
            fs.createReadStream(imagepath),
            fs.createReadStream(maskpath),
            reqprompt,
            1,
            "256x256"
        );
        const imageUrl = response.data.data[0].url;
        imageToBase64(imageUrl).then(
            (response) => {
                const sendimg = "data:image/png;base64,"+response;
                res.status(200).json({
                    success: true,
                    data: sendimg,
                });
            }
        )
       

    } catch(error){
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        }else{
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: "The image could not be generated",
        });
    }

}

const transImage3 = async(req, res) => {
    //const {reqprompt, reqimage} = req.body;
    console.log("generated 3 begin!!!!");
    const reqprompt = req.body.prompt;
    const reqimage = req.body.image;

    const base64data = reqimage.replace(/^data:image\/\w+;base64,/, "");
    const databuffer = Buffer.from(base64data, 'base64');
    fs.writeFile("./controllers/image.png", databuffer, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("success image");
        }
    });

    const imagepath = path.join(__dirname, 'image.png');

    console.log(req.body);
    try{
        
        const response = await openai.createImageVariation(
           fs.createReadStream(imagepath),
            2,
            "256x256"
        );
      
        const imageUrl = response.data.data[0].url;

        imageToBase64(imageUrl).then(
            (response) => {
                const sendimg = "data:image/png;base64,"+response;
                res.status(200).json({
                    success: true,
                    data: sendimg,
                });
            }
        )

    } catch(error){
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        }else{
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: "The image could not be generated",
        });
    }
}

module.exports = {transImage, transImage2, transImage3};