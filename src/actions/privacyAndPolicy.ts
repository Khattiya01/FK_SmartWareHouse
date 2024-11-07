"use server";

import {
  deletePrivacyAndPolicySchema,
  insertPrivacyAndPolicySchema,
  updateIsActivePrivacyAndPolicySchema,
  updatePrivacyAndPolicySchema,
} from "@/db/schemas";
import { privacyAndPolicyException } from "@/exceptions/privacyAndPolicy";
import {
  addPrivacyAndPolicy,
  deletePrivacyAndPolicy,
  editIsActivePrivacyAndPolicy,
  editPrivacyAndPolicy,
  editPrivacyAndPolicyOtherIsActiveFalse,
  getPrivacyAndPolicyById,
  getPrivacyAndPolicyIsActive,
} from "@/services/privacyAndPolicy";

import { revalidatePath } from "next/cache";

export async function createPrivacyAndPolicyAction(formData: FormData) {
  try {
    const privacy_policy = formData.get("privacy_policy")?.toString();

    const validatedFields = insertPrivacyAndPolicySchema.safeParse({
      privacy_policy: formData.get("privacy_policy"),
    });
    if (!validatedFields.success) {
      return privacyAndPolicyException.misMatchData();
    }

    if (privacy_policy) {
      const payload = {
        privacy_policy,
      };
      await addPrivacyAndPolicy(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create privacy and policy successfully",
        result: null,
      };
    } else {
      return privacyAndPolicyException.createError(
        "privacy and policy are required."
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return privacyAndPolicyException.createError(error?.message);
    }
  }
}

export async function updatePrivacyAndPolicyAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const privacy_policy = formData.get("privacy_policy")?.toString();
    const validatedFields = updatePrivacyAndPolicySchema.safeParse({
      id,
      privacy_policy,
    });

    if (!validatedFields.success) {
      return privacyAndPolicyException.updateFail();
    }

    if (privacy_policy && id) {
      const responsePrivacyAndPolicyById = await getPrivacyAndPolicyById(id);

      if (!responsePrivacyAndPolicyById) {
        return privacyAndPolicyException.createError("ID not found");
      }

      const payload = {
        id: id,
        privacy_policy,
      };
      await editPrivacyAndPolicy(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "update privacy and policy successfully",
        result: null,
      };
    } else {
      return privacyAndPolicyException.createError(
        "privacy and policy and id are required."
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return privacyAndPolicyException.createError(error?.message);
    }
  }
}
export async function updateIsActivePrivacyAndPolicyAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const is_active = formData.get("is_active")?.toString();

    const validatedFields = updateIsActivePrivacyAndPolicySchema.safeParse({
      id,
      is_active: is_active === "true" ? true : false,
    });
    if (!validatedFields.success) {
      return privacyAndPolicyException.updateFail();
    }

    if ((is_active === "true" || is_active === "false") && id) {
      const responseGetPrivacyAndPolicyIsActive =
        await getPrivacyAndPolicyIsActive();
      if (is_active === "true") {
        if (
          responseGetPrivacyAndPolicyIsActive &&
          responseGetPrivacyAndPolicyIsActive.id !== id
        ) {
          editPrivacyAndPolicyOtherIsActiveFalse(
            responseGetPrivacyAndPolicyIsActive.id
          );
        }
      } else if (
        responseGetPrivacyAndPolicyIsActive &&
        responseGetPrivacyAndPolicyIsActive.id === id
      ) {
        return privacyAndPolicyException.createError(
          "There are no other logos active."
        );
      }

      await editIsActivePrivacyAndPolicy({
        id: id,
        is_active: is_active === "true" ? true : false,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update privacy and policy successfully",
        result: null,
      };
    } else {
      return privacyAndPolicyException.createError(
        "isActive or id are required."
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return privacyAndPolicyException.createError(error?.message);
    }
  }
}

export async function deletePrivacyAndPolicyAction({ id }: { id: string }) {
  try {
    const validatedFields = deletePrivacyAndPolicySchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return privacyAndPolicyException.deleteFail();
    }

    if (id) {
      await deletePrivacyAndPolicy(id);

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete privacy and policy successfully",
        result: null,
      };
    } else {
      return privacyAndPolicyException.createError("id is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return privacyAndPolicyException.createError(error?.message);
    }
  }
}
