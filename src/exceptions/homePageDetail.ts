import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class homePageDetailException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create home page detail failed",
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
      message: "Update home page detail error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete home page detail error",
      success: false,
    };
  }
}
