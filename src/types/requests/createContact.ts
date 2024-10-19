export type CreateContactType = {
  address: string;
  province: string;
  district: string;
  sub_district: string;
  postal_code: string;
  tel: string;
  phone: string;
  map_image: File[];
  bg_image: File[];
  line_id: string;
  line_url: string;
  facebook_url: string;
  tiktok_url: string;
  start_day_bs_hour: string;
  end_day_bs_hour: string;
  is_active: boolean;
};
