import { SelectHomePageDetail } from "@/db/schemas";
import { APIResponse } from "@/types/response";
import AxiosInstance from "@/utils/interceptors";

export const fetchHomeDetail = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const response = await AxiosInstance.get<APIResponse<SelectHomePageDetail[]>>(
    `/api/manage/home-detail?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

// export const fetchImages = async (images: any[]) => {
//   try {
//     const newImagesPromises = images.map(async (image: any) => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${image.file_url}`
//       );
//       const blobData = await response.blob();
//       const blobToFile: any = new File([blobData], image.file_name, {
//         type: image.file_type,
//       });
//       blobToFile.status = "new";
//       blobToFile.url = URL.createObjectURL(blobToFile);
//       blobToFile.imageURL = URL.createObjectURL(blobToFile);
//       blobToFile.file_url = URL.createObjectURL(blobToFile);
//       blobToFile.id = Math.random().toString(36).slice(2);
//       return blobToFile;
//     });

//     const newImages = await Promise.all(newImagesPromises);
//     return newImages;
//   } catch (error) {
//     console.log(error);
//   }
// };
