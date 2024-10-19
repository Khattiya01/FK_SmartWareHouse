"use client";

import { deleteUserAction, updateUserAction } from "@/actions/users";
import { SelectUser, UpdateUser, updateUserSchema } from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const RowUser = ({ user }: { user: SelectUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<UpdateUser>({
    defaultValues: {},
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data: UpdateUser) => {
    const formData = new FormData();
    if (data.username) {
      formData.append("username", data.username);
    }
    if (data.role) {
      formData.append("role", data.role);
    }
    await updateUserAction({ formData, id: data.id })
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

  const handleDelete = async () => {
    await deleteUserAction({ id: user.id })
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
  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("role", user.role);
      setValue("username", user.username);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">username : </label>
      <input type="text" required {...register("username")} />
      <label htmlFor="role">role : </label>
      <input type="text" required {...register("role")} />
      <button className=" mr-2">update user</button>
      <button onClick={handleDelete} type="button">
        delete user
      </button>
    </form>
  );
};

export default RowUser;
