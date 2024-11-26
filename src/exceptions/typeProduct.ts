import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class typeProductException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create type Product failed",
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
      message: "Update type Product error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete type Product error",
      success: false,
    };
  }
}
