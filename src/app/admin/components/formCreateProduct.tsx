"use client";

import { createFileAction } from "@/actions/files";
import { createProductAction } from "@/actions/products";
import { CreateProduct } from "@/schemas/createProduct";
import { CreatProductType } from "@/types/requests/createProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormCreateProduct = () => {
  const { register, handleSubmit } = useForm<CreatProductType>({
    defaultValues: {},
    resolver: zodResolver(CreateProduct),
  });

  const onSubmit = async (data: CreatProductType) => {
    console.log("data", data);

    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();
    Array.from(data.main_image).forEach((file) => {
      formData1.append("file", file);
    });

    let ressub_image_1: any;

    if (data?.sub_image_1) {
      Array.from(data?.sub_image_1).map((file) => {
        formData2.append("file", file);
      });
      ressub_image_1 = await createFileAction(formData2);
    }
    Array.from(data.map_image).map((file) => {
      formData3.append("file", file);
    });
    Array.from(data.others_image).map((file) => {
      formData4.append("file", file);
    });
    const resmain_image = await createFileAction(formData1);
    const resmap_image = await createFileAction(formData3);
    const resothers_image = await createFileAction(formData4);

    const fd = new FormData();
    fd.append("category_id", data.category_id);
    fd.append("name", data.name);
    fd.append("description", data.description);
    fd.append("price", data.price);
    fd.append("address", data.address);
    fd.append("province", data.province);
    fd.append("district", data.district);
    fd.append("sub_district", data.sub_district);
    fd.append("postal_code", data.postal_code);
    if (data?.tel) {
      fd.append("tel", data?.tel);
    }
    if (data?.phone) {
      fd.append("phone", data?.phone);
    }

    if (resmain_image.result?.file_url) {
      fd.append("main_image", resmain_image.result?.file_url);
    }
    if (ressub_image_1?.result?.file_url) {
      fd.append("sub_image_1", ressub_image_1.result?.file_url);
    }
    if (resmap_image.result?.file_url) {
      fd.append("map_image", resmap_image.result?.file_url);
    }
    if (resothers_image.result?.file_url) {
      fd.append("others_image", resothers_image.result?.file_url);
    }

    await createProductAction(fd)
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create product:", err?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">product name : </label>
      <input type="text" required {...register("name")} />
      <label htmlFor="category_id">category_id : </label>
      <input type="text" required {...register("category_id")} />
      <label htmlFor="description">description : </label>
      <textarea required {...register("description")} />
      <label htmlFor="price">price : </label>
      <input type="text" required {...register("price")} />
      <label htmlFor="address">address : </label>
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

      <label htmlFor="main_image">main_image: </label>
      <input
        id="main_image"
        {...register("main_image")}
        type="file"
        accept="image/*"
        required
      />

      <label htmlFor="sub_image_1">sub_image_1: </label>
      <input
        id="sub_image_1"
        {...register("sub_image_1")}
        type="file"
        accept="image/*"
        required
      />

      <label htmlFor="map_image">map_image : </label>
      <input
        id="map_image"
        {...register("map_image")}
        type="file"
        accept="image/*"
        required
      />

      <label htmlFor="others_image">others_image : </label>
      <input
        id="others_image"
        {...register("others_image")}
        type="file"
        accept="image/*"
        required
        multiple
      />

      <button type="submit">Add product</button>
    </form>
  );
};

export default FormCreateProduct;
