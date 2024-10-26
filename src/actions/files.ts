"use server";

import {
  deleteFileSchema,
  insertFileSchema,
  updateFileSchema,
} from "@/db/schemas";
import { fileException } from "@/exceptions/files";
import {
  addFiles,
  deleteFiles,
  editFiles,
  getFilesByUrl,
} from "@/services/files";
import { revalidatePath } from "next/cache";

import { join } from "path";
import { stat, mkdir, writeFile, unlink, readdir, rmdir } from "fs/promises";
import mime from "mime";
import { decodeString } from "@/utils/decodeString";

const relativeUploadDir = `/uploads/${new Date(Date.now())
  .toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .replace(/\//g, "-")}`;

const uploadDir = join(process.cwd(), "public", relativeUploadDir);

const updateFolder = async () => {
  try {
    await stat(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }
};

export async function createFileAction(formData: FormData) {
  const files = formData.getAll("file") as File[];

  if (!files) {
    return fileException.createError("file is required.");
  }

  const AllFilesURL: string[] = [];

  try {
    await Promise.all(
      files.map(async (file) => {
        const validatedFields = insertFileSchema.safeParse({
          file_url: `/uploads/${decodeString(file.name)}`,
          file_name: decodeString(file.name),
          file_type: file.type,
          file_size: file.size,
        });

        if (!validatedFields.success) {
          throw fileException.createError("File is incorrect.");
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        updateFolder();

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${decodeString(file.name).replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;
        AllFilesURL.push(fileUrl);

        // Save to database
        await addFiles({
          file_url: fileUrl,
          file_name: decodeString(file.name),
          file_type: file.type,
          file_size: file.size.toString(),
        });
      })
    );

    return {
      success: true,
      message: "Create file successfully",
      result: {
        file_url: AllFilesURL.join(","),
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return fileException.createError(error?.message);
    }
  }
}

export async function updateFileAction({
  formData,
  file_url,
}: {
  formData: FormData;
  file_url: string;
}) {
  let files = formData.getAll("file") as File | File[];

  if (!files) {
    return fileException.createError("file is required.");
  }
  if (Array.isArray(files)) {
    files = files[0];
  }
  const validatedFields = updateFileSchema.safeParse({
    file_url: file_url,
    file_name: decodeString(files.name),
    file_type: files.type,
    file_size: files.size,
  });

  if (!validatedFields.success) {
    return fileException.createError("File is incorrect.");
  }

  const buffer = Buffer.from(await files.arrayBuffer());

  updateFolder();

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${decodeString(files.name).replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(files.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    if (fileUrl) {
      const responseGetFilesByURL = await getFilesByUrl(file_url);

      if (responseGetFilesByURL && responseGetFilesByURL.length > 0) {
        const filePath = join(process.cwd(), "public", file_url);

        await unlink(filePath);
        await editFiles({
          id: responseGetFilesByURL[0].id,
          file_url: fileUrl,
          file_name: decodeString(files.name),
          file_type: files.type,
          file_size: files.size.toString(),
        });

        revalidatePath("/admin");
        return {
          success: true,
          message: "update logo successfully",
          result: {
            file_url: fileUrl,
          },
        };
      } else {
        return fileException.notFound();
      }
    } else {
      return fileException.createError("File URL is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return fileException.createError(error?.message);
    }
  }
}

export async function deleteFileAction({ file_url }: { file_url: string }) {
  try {
    const validatedFields = deleteFileSchema.safeParse({
      file_url: file_url,
    });
    if (!validatedFields.success) {
      return fileException.deleteFail();
    }

    if (file_url) {
      const responseGetFilesByUrl = await getFilesByUrl(file_url);

      if (!(responseGetFilesByUrl && responseGetFilesByUrl.length > 0)) {
        return fileException.notFound();
      }

      const filePath = join(process.cwd(), "public", file_url);

      await unlink(filePath);

      await deleteFiles(file_url);

      const directoryPath = join(
        process.cwd(),
        "public",
        file_url.split("/").slice(0, -1).join("/")
      );

      const filesInDirectory = await readdir(directoryPath);

      if (filesInDirectory.length === 0) {
        await rmdir(directoryPath);
      }
      console.log("deleteFiles", file_url);
      revalidatePath("/admin");
      return {
        success: true,
        message: "delete file successfully",
        result: null,
      };
    } else {
      return fileException.createError("id is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return fileException.createError(error?.message);
    }
  }
}
