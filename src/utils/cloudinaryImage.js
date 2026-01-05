import cloudinary from "@/config/Cloudinary";

export const uploadImage = async (image, folder = "bookify/books") => {
  const result = await cloudinary.uploader.upload(image, {
    folder,
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    imageUrl: result.secure_url,
    width: result.width,
    height: result.height,
  };
};

export const getImage = async (publicId) => {
  return await cloudinary.api.resource(publicId);
};

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
