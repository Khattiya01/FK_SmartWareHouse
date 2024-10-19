"use client";

import { createCategoryAction, deleteCategoryAction } from "@/actions/category";
import { createFileAction } from "@/actions/files";
import { fetchFileByURL, fetchImages } from "@/api/file";
import { SelectCategory } from "@/db/schemas";
import { CreateCategory } from "@/schemas/createCategory";
import { CreatCategoryType } from "@/types/requests/createCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const RowCategory = ({ data }: { data: SelectCategory }) => {
  const { register, handleSubmit, setValue,} = useForm<CreatCategoryType>({
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

  const handleDelete = async () => {
    await deleteCategoryAction({
      id: data.id,
      file_url: data.image_url,
    })
      .then((res) => {
        if (res.success) {
          console.log(res);
        } else {
          console.error("Error delete category:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error delete category:", err.message);
      });
  };

  const fetchFileData = async (data: SelectCategory) => {
    let preData: any = {
      id: data.id,
      image_url: [],
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
    const image_url = data.image_url;
    const responseImage_url = await fetchFileByURL(image_url);
    const responseFullImage_url = await fetchImages(responseImage_url.result);
    preData.image_url.push(
      responseFullImage_url ? responseFullImage_url[0] : []
    );

    console.log("preData", preData);

    setValue("name", data.name);
    setValue("image_url", preData.image_url);
  };

  useEffect(() => {
    if (data) {
      fetchFileData(data);
    }

    console.log("data", data);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Category name : </label>
      <input type="text" required {...register("name")} />

      <label htmlFor="image_url">Category Image:</label>
      <input
        id="image_url"
        {...register("image_url")}
        type="file"
        accept="image/*"
        required
      />
      <button className=" mr-2">update category</button>
      <button typeof="button" onClick={handleDelete} type="button">
        delete category
      </button>
    </form>
  );
};

export default RowCategory;
