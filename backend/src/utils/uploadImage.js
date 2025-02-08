const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

// cloudinary.config({
//   cloud_name: 'dbatbjgdy',
//   api_key: '871711944542931',
//   api_secret: 'jXg-lt-kPBo99zQRzK66R11FbQY',
// });

/*
    go to cloudinary.com, go to dashboard
    https://console.cloudinary.com/settings/c-0a3836001cf4b92d8155405a460910/api-keys
 */

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};


module.exports = (image) => {
  //image = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};