import { blobToFile } from "../file";

export type CreatProductType = {
  category_id: string;
  typeProduct_id: string;
  name: string;
  description: string;
  price: string;
  main_image: blobToFile[];
  map_image: blobToFile[];
  others_image: blobToFile[];
  address: string;
  province: string;
  district: string;
  sub_district: string;
  postal_code: string;
  tel?: string | undefined;
  phone?: string | undefined;
  remark?: string | undefined;
};
