export type CreatProductType = {
  category_id: string;
  name: string;
  description: string;
  price: string;
  main_image: File[];
  sub_image_1?: File[] | undefined;
  map_image: File[];
  others_image: File[];
  address: string;
  province: string;
  district: string;
  sub_district: string;
  postal_code: string;
  tel?: string | undefined;
  phone?: string| undefined;
};
