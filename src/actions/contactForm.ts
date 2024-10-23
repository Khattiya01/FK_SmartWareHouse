"use server";

import {
  deleteContactFormSchema,
  insertContactFormSchema,
  updatelogoSchema,
} from "@/db/schemas";
import { contactFormException } from "@/exceptions/contactForm";
import { logoException } from "@/exceptions/logos";
import { addContactForm, deleteContactForm } from "@/services/contactForm";
import { editLogos } from "@/services/logo";
import { revalidatePath } from "next/cache";

export async function createContactFormAction(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const lineId = formData.get("lineId")?.toString();
    const title = formData.get("title")?.toString();
    const message = formData.get("message")?.toString();

    const validatedFields = insertContactFormSchema.safeParse({
      name: name,
      phone: phone,
      email: email,
      title: title,
      lineId: lineId,
      message: message,
    });

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return contactFormException.misMatchData();
    }

    if (name && phone && email && title && message && lineId) {
      const payload = {
        name: name,
        phone: phone,
        email: email,
        lineId: lineId,
        title: title,
        message: message,
      };
      await addContactForm(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create contac formt successfully",
        result: null,
      };
    } else {
      return contactFormException.misMatchData();
    }
  } catch (error: any) {
    return contactFormException.createError(error?.message);
  }
}

export async function updateProductAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const image_url = formData.get("image_url")?.toString();

    const validatedFields = updatelogoSchema.safeParse({
      id,
      image_url,
    });
    if (!validatedFields.success) {
      return logoException.updateFail();
    }

    if (image_url && id) {
      const payload = {
        id: id,
        image_url,
      };
      await editLogos(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "update logo successfully",
        result: null,
      };
    } else {
      return logoException.createError("Image URL or id are required.");
    }
  } catch (error: any) {
    return logoException.createError(error?.message);
  }
}

export async function deleteContactFormAction({ id }: { id: string }) {
  try {
    const validatedFields = deleteContactFormSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return contactFormException.deleteFail();
    }

    if (id) {
      await deleteContactForm(id);

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete contact form successfully",
        result: null,
      };
    } else {
      return contactFormException.createError("id is required.");
    }
  } catch (error: any) {
    return contactFormException.createError(error?.message);
  }
}
