"use client";

import { createContactAction } from "@/actions/contact";
import { createFileAction } from "@/actions/files";
import { CreateContact } from "@/schemas/createContact";
import { CreateContactType } from "@/types/requests/createContact";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormCreateContact = () => {
  const { register, handleSubmit } = useForm<CreateContactType>({
    defaultValues: {},
    resolver: zodResolver(CreateContact),
  });

  const onSubmit = async (data: CreateContactType) => {
    console.log("data", data);

    const formData1 = new FormData();
    const formData2 = new FormData();

    Array.from(data.map_image).map((file) => {
      formData1.append("file", file);
    });
    Array.from(data.bg_image).map((file) => {
      formData2.append("file", file);
    });
    const resmain_image = await createFileAction(formData1);
    const resbg_image = await createFileAction(formData2);

    const fd = new FormData();
    fd.append("tel", data.tel);
    fd.append("phone", data.phone);
    fd.append("line_id", data.line_id);
    fd.append("line_url", data.line_url);
    fd.append("facebook_url", data.facebook_url);
    fd.append("tiktok_url", data.tiktok_url);
    fd.append("start_day_bs_hour", data.start_day_bs_hour);
    fd.append("end_day_bs_hour", data.end_day_bs_hour);
    fd.append("address", data.address);
    fd.append("province", data.province);
    fd.append("district", data.district);
    fd.append("sub_district", data.sub_district);
    fd.append("postal_code", data.postal_code);

    if (resmain_image.result?.file_url) {
      fd.append("map_image", resmain_image.result?.file_url);
    }
    if (resbg_image.result?.file_url) {
      fd.append("bg_image", resbg_image.result?.file_url);
    }

    await createContactAction(fd)
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create product:", err?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="address">Address : </label>
      <input type="text" required {...register("address")} />
      <label htmlFor="province">province : </label>
      <input type="text" required {...register("province")} />
      <label htmlFor="district">district : </label>
      <input type="text" required {...register("district")} />
      <label htmlFor="sub_district">sub_district : </label>
      <input type="text" required {...register("sub_district")} />
      <label htmlFor="postal_code">postal_code : </label>
      <input type="text" required {...register("postal_code")} />
      <label htmlFor="tel">tel : </label>
      <input type="text" required {...register("tel")} />
      <label htmlFor="phone">phone : </label>
      <input type="text" required {...register("phone")} />
      <label htmlFor="line_id">line_id : </label>
      <input type="text" required {...register("line_id")} />
      <label htmlFor="line_url">line_url : </label>
      <input type="text" required {...register("line_url")} />
      <label htmlFor="facebook_url">facebook_url : </label>
      <input type="text" required {...register("facebook_url")} />
      <label htmlFor="tiktok_url">tiktok_url : </label>
      <input type="text" required {...register("tiktok_url")} />
      <label htmlFor="start_day_bs_hour">start_day_bs_hour : </label>
      <input type="text" required {...register("start_day_bs_hour")} />
      <label htmlFor="end_day_bs_hour">end_day_bs_hour : </label>
      <input type="text" required {...register("end_day_bs_hour")} />

      <label htmlFor="map_image">map_image : </label>
      <input
        id="map_image"
        {...register("map_image")}
        type="file"
        accept="image/*"
        required
      />

      <label htmlFor="bg_image">bg_image : </label>
      <input
        id="bg_image"
        {...register("bg_image")}
        type="file"
        accept="image/*"
        required
        multiple
      />

      <button type="submit">Add contact</button>
    </form>
  );
};

export default FormCreateContact;
