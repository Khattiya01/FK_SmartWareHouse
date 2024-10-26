import { SelectFile } from "@/db/schemas";
import { blobToFile } from "@/types/file";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchFileByURL = async (url: string) => {
  const response = await AxiosInstance.get<APIResponse<SelectFile[]>>(
    `/api/file?url=${url}`
  );
  return response.data;
};

export const fetchImages = async (images: SelectFile[]) => {
  const newImagesPromises = images.map(async (image) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${image.file_url}`
    );
    const blobData = await response.blob();
    const blobToFile = new File([blobData], image.file_name, {
      type: image.file_type,
    });
    const newBlobData: blobToFile = {
      ...blobToFile,
      index: "",
      id: "",
      status: "",
      imageURL: "",
      url: "",
      file_url: "",
      error: false,
    };
    newBlobData.status = "new";
    newBlobData.url = URL.createObjectURL(blobToFile);
    newBlobData.imageURL = URL.createObjectURL(blobToFile);
    newBlobData.file_url = URL.createObjectURL(blobToFile);
    newBlobData.id = Math.random().toString(36).slice(2);
    return newBlobData;
  });

  const newImages = await Promise.all(newImagesPromises);
  return newImages;
};
