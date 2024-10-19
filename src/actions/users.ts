"use server";

import { insertUserSchema, updateUserSchema } from "@/db/schemas";
import { userException } from "@/exceptions/users";
import {
  addUsers,
  deleteUser,
  editUser,
  getUsersByUsername,
} from "@/services/users";
import { hashPassword } from "@/utils/hashPassword";
import { revalidatePath } from "next/cache";

export async function createUserAction(formData: FormData) {
  try {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    const role = formData.get("role")?.toString();

    const validatedFields = insertUserSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role"),
    });

    if (!validatedFields.success) {
      return userException.createError(
        "The username or password is incorrect."
      );
    }

    if (username && password && role) {
      const responseGetUsersByUsername = await getUsersByUsername({
        username,
      });
      if (responseGetUsersByUsername && responseGetUsersByUsername.length > 0) {
        return userException.duplicate();
      }

      const hashedPassword = await hashPassword(password);

      const payload = {
        username,
        password: hashedPassword,
        role,
      };
      await addUsers(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create user successfully",
        result: null,
      };
    } else {
      return userException.createError(
        "username, password, and role are required."
      );
    }
  } catch (error: any) {
    return userException.createError(error?.message);
  }
}

export async function updateUserAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const username = formData.get("username")?.toString();
    const role = formData.get("role")?.toString();

    const validatedFields = updateUserSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return userException.updateFail();
    }

    if (username && role && id) {
      const responseGetUsersByUsername = await getUsersByUsername({
        username,
      });
      if (responseGetUsersByUsername && responseGetUsersByUsername.length > 0) {
        return userException.duplicate();
      }

      const payload = {
        id: id,
        username,
        role,
      };
      await editUser(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "update user successfully",
        result: null,
      };
    } else {
      return userException.createError("username and role are required.");
    }
  } catch (error: any) {
    return userException.createError(error?.message);
  }
}

export async function deleteUserAction({ id }: { id: string }) {
  try {
    const validatedFields = updateUserSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return userException.deleteFail();
    }

    if (id) {
      await deleteUser(id);

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete user successfully",
        result: null,
      };
    } else {
      return userException.createError("id is required.");
    }
  } catch (error: any) {
    return userException.createError(error?.message);
  }
}
