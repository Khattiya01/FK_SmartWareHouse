"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertUser, insertUserSchema } from "@/db/schemas";
import { createUserAction } from "@/actions/users";

const FormCreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsertUser>({
    defaultValues: {},
    resolver: zodResolver(insertUserSchema),
  });

  const onSubmit = async (data: InsertUser) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("role", data.role);

    await createUserAction(formData)
      .then((res) => {
        if (res.success) {
          reset();
        } else {
          console.error("Error update project:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error update project:", err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">username : </label>
        <input type="text" required {...register("username")} />
        <label htmlFor="password">password : </label>
        <input type="text" required {...register("password")} />
        <label htmlFor="role">role : </label>
        <input type="text" required {...register("role")} />
        <button>add user</button>
      </form>
    </div>
  );
};

export default FormCreateUser;
