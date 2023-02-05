const {Configuration, OpenAIApi} = require('openai');
const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const transImage = async(req, res)=>{
    const {reqprompt, reqimage} = req.body;
    try{
        const response = await openai.createImageEdit({
            image: fs.createReadStream(reqimage),
            prompt: reqprompt,
            n: 1,
            size: "1024x1024"
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

module.exports = {transImage};