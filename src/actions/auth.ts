"use server";

import { userException } from "@/exceptions/users";
import { loginSchema } from "@/schemas/auth";
import { getUsersByUsername } from "@/services/users";
import { checkPassword } from "@/utils/checkPassword";

import jwt from "jsonwebtoken";

export async function loginAction(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  const validatedFields = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return userException.createError("The username or password is incorrect.");
  }

  if (username && password) {
    const responseGetUsersByUsername = await getUsersByUsername({
      username,
    });
    if (
      !(responseGetUsersByUsername && responseGetUsersByUsername.length > 0)
    ) {
      return userException.createError("not-found-user");
    }

    const isValidPassword = await checkPassword({
      password,
      hashedPassword: responseGetUsersByUsername[0].password,
    });

    if (!isValidPassword) {
      return userException.createError("invalid-password");
    }

    const user = responseGetUsersByUsername[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: process.env.ACCESS_EXPIRATION_MINUTES,
    });

    return {
      success: true,
      message: "Login successfully",
      result: { user: responseGetUsersByUsername[0], token: token },
    };
  } else {
    return userException.createError("username, password are required.");
  }
}
