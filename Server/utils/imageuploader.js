const cloudinary = require("cloudinary").v2;
const fs = require("fs");
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  /**When you set options.resource_type to "auto", Cloudinary examines
   *  the file you are uploading and determines whether it is an image,
   * video, or raw file based on its content and file extension.
   * This is particularly useful when uploading files without explicitly specifying
   *  their type or when you are dealing with a variety of file types. */
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  const response = await cloudinary.uploader.upload(file.tempFilePath, options);
  // unlink the temp file that is remove the locally
  //  saved temporary files
  fs.unlinkSync(file.tempFilePath);
  return response;
};
