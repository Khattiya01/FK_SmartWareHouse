import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class fileException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create file failed",
      success: false,
    };
  }

  static notFound(): FormStateType {
    return {
      code: 404,
      message: "Not found file",
      success: false,
    };
  }

  static updateFail(): FormStateType {
    return {
      code: 422,
      message: "Update file error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete file error",
      success: false,
    };
  }
}
