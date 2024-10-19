"use client";

import { createCategoryAction } from "@/actions/category";
import { createFileAction } from "@/actions/files";
import { CreateCategory } from "@/schemas/createCategory";
import { CreatCategoryType } from "@/types/requests/createCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormCreateCategory = () => {
  const { register, handleSubmit } = useForm<CreatCategoryType>({
    defaultValues: {},
    resolver: zodResolver(CreateCategory),
  });

  const onSubmit = async (data: CreatCategoryType) => {
    console.log("data", data);

    const formData = new FormData();

    Array.from(data.image_url).map((file) => {
      formData.append("file", file);
    });

    const resImage_url = await createFileAction(formData);

    const fd = new FormData();
    fd.append("name", data.name);

    if (resImage_url.result?.file_url) {
      fd.append("image_url", resImage_url.result?.file_url);
    }

    await createCategoryAction(fd)
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create category:", err?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Category name : </label>
      <input type="text" required {...register("name")} />

      <label htmlFor="image_url">Category Image: </label>
      <input
        id="image_url"
        {...register("image_url")}
        type="file"
        accept="image/*"
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default FormCreateCategory;
