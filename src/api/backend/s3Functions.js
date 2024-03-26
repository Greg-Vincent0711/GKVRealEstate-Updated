
/**
 * @author Gregory Vincent
 * @date 3/8/24
 * image fetching fn from s3
 */

import dotenv from "dotenv"
dotenv.configDotenv();
import AWS from "aws-sdk";
// check for these variables before doing anything else
if(!(process.env.BUCKET && process.env.SECRET_ACCESS_KEY && process.env.ACCESS_KEY_ID && process.env.REGION)){
    throw new Error("Needed environment variables aren't present.")
}

AWS.config.update({ 
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY 
});

const client = new AWS.S3({
    params: {Bucket: process.env.BUCKET},
    region: process.env.REGION,
})

const generateSingleImageURL = async (key) => {
    try {
        const getObjectParameters = {
            Bucket: process.env.BUCKET,
            Key: key,
        };
        // generate URL for a single image
        const url = await client.getSignedUrlPromise('getObject', getObjectParameters);
        return url;
    } catch (error) {
        console.error(`Error making URL for "${key}. More info..."`, error);
        throw error;
    }
}

const generateImageURLs = async () => {
    try {
        let imageURLs = []
        // get all the images in the bucket...very few(< 10), so acceptable for now
        // if the application grows though this will have to change
        const images = await client.listObjectsV2({ Bucket: process.env.BUCKET ?? "" }).promise();
        // generate urls for each
        if (images.Contents !== undefined){
            imageURLs = await Promise.all(images.Contents.map(async (image) => {
                // key == image name
                const createdURL = await generateSingleImageURL(image.Key);
                return { key: image.Key, url: createdURL };
            }));
        }
        console.log("Made a get request to the server.")
        return imageURLs;
    } catch (error) {
        console.error("Could not create URLs for images...check S3. Further information: ", error);
        return []
    }
}
export default generateImageURLs;




