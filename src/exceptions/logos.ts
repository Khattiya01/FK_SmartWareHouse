import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class logoException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create logo failed",
      success: false,
    };
  }

  static notFound(): FormStateType {
    return {
      code: 404,
      message: "Not found logo",
      success: false,
    };
  }

  static updateFail(): FormStateType {
    return {
      code: 422,
      message: "Update logo error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete logo error",
      success: false,
    };
  }
}
