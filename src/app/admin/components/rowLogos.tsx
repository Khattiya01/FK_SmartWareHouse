"use client";

import { deleteFileAction, updateFileAction } from "@/actions/files";
import {
  deleteLogoAction,
  updateIsActiveLogoAction,
  updateLogoAction,
} from "@/actions/logos";
import { Selectlogo } from "@/db/schemas";
import React, { useEffect, useState } from "react";

const RowLogo = ({ data }: { data: Selectlogo }) => {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (data.image_url) {
      await updateFileAction({ formData, file_url: data.image_url })
        .then(async (res) => {
          if (res?.success) {
            if (res.result) {
              const fd = new FormData();
              fd.append("image_url", res.result.file_url);
              await updateLogoAction({ formData: fd, id: data.id })
                .then(() => {
                  console.log(res?.message);
                })
                .catch(() => {
                  console.error("Error create logo:", res?.message);
                });
            }
          } else {
            console.error("Error create file:", res?.message);
          }
        })
        .catch((err) => {
          console.error("Error create file:", err.message);
        });
    } else {
      console.error("Error update file: File URL Not Found");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
      } else {
        alert("Please select an image file.");
        setFile(null);
      }
    }
  };

  const handleDelete = async () => {
    if (data.image_url) {
      await deleteLogoAction({ id: data.id, file_url: data.image_url })
        .then((res) => {
          if (res.success) {
            console.log(res);
            if (data.image_url) {
              deleteFileAction({ file_url: data.image_url })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.error("Error delete file:", err.message);
                });
            } else {
              console.error("Error delete file: File URL is required");
            }
          } else {
            console.error("Error delete logo:", res.message);
          }
        })
        .catch((err) => {
          console.error("Error delete logo:", err.message);
        });
    } else {
      console.error("Error delete file: File URL is required");
    }
  };

  const handleActiveLogo = async (isActive: boolean) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveLogoAction({ formData, id: data.id })
      .then((res) => {
        console.log(res?.message);
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });
  };

  useEffect(() => {
    if (data) {
      const newFile: any = data;
      newFile["image_url"] = data["image_url"];
      setFile(newFile);
    }
  }, [data]);

  return (
    <div className=" flex gap-2">
      <label htmlFor="image_url">Logo: {data?.image_url}</label>
      <input
        type="file"
        accept="image/*"
        required
        onChange={handleFileChange}
      />
      <label htmlFor={"isActive" + data.id}>isActive</label>
      <input
        id={"isActive" + data.id}
        type="checkbox"
        checked={data.is_active ?? false}
        onChange={(e) => handleActiveLogo(e.target.checked)}
        disabled={data.is_active ?? false}
      />
      <button onClick={onSubmit} className=" mr-2">
        update logo
      </button>
      <button onClick={handleDelete} type="button">
        delete logo
      </button>
    </div>
  );
};

export default RowLogo;
