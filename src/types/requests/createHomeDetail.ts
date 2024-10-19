import { blobToFile } from "../file";

export type CreatHomePageDetailType = {
  content_01_title: string;
  content_01_detail: string;
  content_02_detail: string;
  content_02_image_url: blobToFile[];
  banner_image_url: blobToFile[];
  contact_image_url: blobToFile[];
  is_active?: boolean | undefined;
};
