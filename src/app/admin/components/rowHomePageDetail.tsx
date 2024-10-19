"use client";

import { createFileAction } from "@/actions/files";
import {
  createHomePageDetailAction,
  deleteHomePageDetailAction,
  updateIsActiveHomePageDetailAction,
} from "@/actions/homePageDetail";
import { fetchFileByURL, fetchImages } from "@/api/file";
import { SelectHomePageDetail } from "@/db/schemas";
import { CreateHomePageDetail } from "@/schemas/createHomePageDetail";
import { CreatHomePageDetailType } from "@/types/requests/createHomeDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const RowHomePageDetail = ({ data }: { data: SelectHomePageDetail }) => {
  const {
    register,
    handleSubmit,
    setValue,
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
  const handleDelete = async () => {
    await deleteHomePageDetailAction({
      id: data.id,
      file_url:
        data.banner_image_url +
        "," +
        data.contact_image_url +
        "," +
        data.content_02_image_url,
    })
      .then((res) => {
        if (res.success) {
          console.log(res);
        } else {
          console.error("Error delete logo:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error delete logo:", err.message);
      });
  };

  const handleActive = async (isActive: boolean) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveHomePageDetailAction({ formData, id: data.id })
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });
  };

  const fetchFileData = async (data: SelectHomePageDetail) => {
    const preData: any = {
      id: data.id,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
      banner_image_url: [],
      content_01_title: data.content_01_title,
      content_01_detail: data.content_01_detail,
      content_02_image_url: [],
      content_02_detail: data.content_02_detail,
      contact_image_url: [],
    };
    const banner_image_urls = data.banner_image_url.split(",");
    const content_02_image_url = data.content_02_image_url;
    const contact_image_url = data.contact_image_url;
    if (banner_image_urls.length > 0) {
      preData.banner_image_url = await Promise.all(
        banner_image_urls.map(async (image) => {
          const response = await fetchFileByURL(image);
          const responseFullbanner_image_urls = await fetchImages(
            response.result
          );
          return responseFullbanner_image_urls
            ? responseFullbanner_image_urls[0]
            : [];
        })
      );
    }
    const responseContent_02_image_url = await fetchFileByURL(
      content_02_image_url
    );
    const responseFullContent_02_image_url = await fetchImages(
      responseContent_02_image_url.result
    );
    preData.content_02_image_url.push(
      responseFullContent_02_image_url
        ? responseFullContent_02_image_url[0]
        : []
    );
    const responseContact_image_url = await fetchFileByURL(contact_image_url);
    const responseFullContact_image_url = await fetchImages(
      responseContact_image_url.result
    );
    preData.contact_image_url.push(
      responseFullContact_image_url ? responseFullContact_image_url[0] : []
    );

    console.log("preData", preData);

    setValue("content_01_title", data.content_01_title);
    setValue("content_01_detail", data.content_01_detail);
    setValue("content_02_detail", data.content_02_detail);
    setValue("banner_image_url", preData.banner_image_url);
    setValue("content_02_image_url", preData.content_02_image_url);
    setValue("contact_image_url", preData.contact_image_url);
  };

  useEffect(() => {
    if (data) {
      fetchFileData(data);
    }

    console.log("data", data);
  }, [data]);

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
        accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
        required
      />

      <label htmlFor="content_02_image_url">content_02_image_url: </label>
      <input
        id="content_02_image_url"
        {...register("content_02_image_url")}
        type="file"
        accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
        required
      />

      <label htmlFor="contact_image_url">Contact Image Url: </label>
      <input
        id="contact_image_url"
        {...register("contact_image_url")}
        type="file"
        accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
        required
      />

      <label htmlFor={"isActive" + data.id}>isActive</label>
      <input
        id={"isActive" + data.id}
        type="checkbox"
        checked={data.is_active ?? false}
        onChange={(e) => handleActive(e.target.checked)}
        disabled={data.is_active ?? false}
      />
      <button className=" mr-2">update home page detail</button>
      <button typeof="button" onClick={handleDelete} type="button">
        delete home page detail
      </button>
    </form>
  );
};

export default RowHomePageDetail;
