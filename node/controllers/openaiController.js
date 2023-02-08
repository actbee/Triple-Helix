const {Configuration, OpenAIApi} = require('openai');
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');

const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const transImage = async(req, res)=>{
    //const {reqprompt, reqimage} = req.body;
    console.log("generated 1 begin!!!!");
    const reqprompt = req.body.prompt;
   
    console.log(req.body);
    try{
        
       
       const response = await openai.createImage({
        prompt: reqprompt,
        n: 1,
        size: "256x256"
       });
        
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
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
    const reqimage = req.body.image[0];

    const base64data = reqimage.replace(/^data:image\/\w+;base64,/, "");
    console.log(base64data);
    const databuffer = Buffer.from(base64data, 'base64');
    fs.writeFile("./controllers/image.png", databuffer, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("success");
        }
    });


    const maskpath = path.join(__dirname, '2.png');
    const imagepath = path.join(__dirname, 'test.png');

    console.log(req.body);
    try{
        
        const response = await openai.createImageEdit(
            fs.createReadStream(imagepath),
            fs.createReadStream(maskpath),
            reqprompt,
            1,
            "256x256"
        );
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
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

    const maskpath = path.join(__dirname, '2.png');
    const imagepath = path.join(__dirname, 'test.png');

    console.log(req.body);
    try{
        
        const response = await openai.createImageVariation(
           fs.createReadStream(imagepath),
            2,
            "256x256"
        );
      
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
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