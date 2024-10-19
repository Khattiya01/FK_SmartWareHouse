"use client";

import { createFileAction } from "@/actions/files";
import { createHomePageDetailAction } from "@/actions/homePageDetail";
import { CreateHomePageDetail } from "@/schemas/createHomePageDetail";
import { CreatHomePageDetailType } from "@/types/requests/createHomeDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormCreateHomeDetail = () => {
  const {
    register,
    handleSubmit,
  } = useForm<CreatHomePageDetailType>({
    defaultValues: {},
    resolver: zodResolver(CreateHomePageDetail),
  });

  const onSubmit = async (data: CreatHomePageDetailType) => {
    console.log("data", data);

    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    Array.from(data.banner_image_url).forEach((file) => {
      formData1.append("file", file);
    });
    Array.from(data.contact_image_url).map((file) => {
      formData2.append("file", file);
    });
    Array.from(data.content_02_image_url).map((file) => {
      formData3.append("file", file);
    });
    const resbanner_image_url = await createFileAction(formData1);
    const rescontact_image_url = await createFileAction(formData2);
    const rescontent_02_image_url = await createFileAction(formData3);

    const fd = new FormData();
    fd.append("content_01_title", data.content_01_title);
    fd.append("content_01_detail", data.content_01_detail);
    fd.append("content_02_detail", data.content_02_detail);

    if (rescontent_02_image_url.result?.file_url) {
      fd.append(
        "content_02_image_url",
        rescontent_02_image_url.result?.file_url
      );
    }
    if (resbanner_image_url.result?.file_url) {
      fd.append("banner_image_url", resbanner_image_url.result?.file_url);
    }
    if (rescontact_image_url.result?.file_url) {
      fd.append("contact_image_url", rescontact_image_url.result?.file_url);
    }

    await createHomePageDetailAction(fd)
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });

    // await createFileAction(formData)
    //   .then(async (res) => {
    //     if (res?.success) {
    //       // if (res.result) {
    //       //   const fd = new FormData();
    //       //   fd.append("image_url", res.result.file_url);
    //       //   await createLogoAction(fd)
    //       //     .then(() => {
    //       //       console.log(res?.message);
    //       //     })
    //       //     .catch(() => {
    //       //       console.error("Error create logo:", res?.message);
    //       //     });
    //       // }
    //     } else {
    //       console.error("Error create file:", res?.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error create file:", err.message);
    //   });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="content_01_title">content_01_title : </label>
      <input type="text" required {...register("content_01_title")} />
      <label htmlFor="content_01_detail">content_01_detail : </label>
      <input type="text" required {...register("content_01_detail")} />
      <label htmlFor="content_02_detail">content_02_detail : </label>
      <input type="text" required {...register("content_02_detail")} />

      <label htmlFor="banner_image_url">banner_image_url: </label>
      <input
        id="banner_image_url"
        {...register("banner_image_url")}
        type="file"
        accept="image/*" 
        required
        multiple
      />

      <label htmlFor="content_02_image_url">content_02_image_url: </label>
      <input
        id="content_02_image_url"
        {...register("content_02_image_url")}
        type="file"
        accept="image/*" 
        required
      />

      <label htmlFor="contact_image_url">Contact Image Url: </label>
      <input
        id="contact_image_url"
        {...register("contact_image_url")}
        type="file"
        accept="image/*" 
        required
      />

      <button type="submit">Add Contact image url</button>
    </form>
  );
};

export default FormCreateHomeDetail;
