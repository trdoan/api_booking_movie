var cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");
const createHttpError = require("http-errors");

const uploadImage = (file, folderClound) => {
  return new Promise((res, err) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: folderClound,
      },
      function (error, result) {
        if (error) err(error);
        else {
          res(result);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

module.exports = {
  uploadImage,
};
