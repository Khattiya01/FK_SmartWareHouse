"use client";

import { createFileAction } from "@/actions/files";
import { createLogoAction } from "@/actions/logos";
import React, { useState } from "react";

const FormCreateLogos = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await createFileAction(formData)
        .then(async (res) => {
          if (res?.success) {
            if (res.result) {
              const fd = new FormData();
              console.log("res.result" ,res.result)
              fd.append("image_url", res.result.file_url);
              await createLogoAction(fd).then(() =>{
                console.log(res?.message);
              }).catch(() => {
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
      console.error("No file selected");
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image_url">Logo: </label>
      <input
        type="file"
        accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
        required
        onChange={handleFileChange}
      />
      <button type="submit">Add Logo</button>
    </form>
  );
};

export default FormCreateLogos;
