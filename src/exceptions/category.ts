import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class categoryException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create category failed",
      success: false,
    };
  }

  static notFound(): FormStateType {
    return {
      code: 404,
      message: "Not found id",
      success: false,
    };
  }

  static updateFail(): FormStateType {
    return {
      code: 422,
      message: "Update category error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete category error",
      success: false,
    };
  }
}
