import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class privacyAndPolicyException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create privacy and policy failed",
      success: false,
    };
  }

  static duplicate(): FormStateType {
    return {
      code: 400,
      message: "Duplicate privacy and policy name",
      success: false,
    };
  }

  static notFound(): FormStateType {
    return {
      code: 404,
      message: "Not found privacy and policy",
      success: false,
    };
  }

  static updateFail(): FormStateType {
    return {
      code: 422,
      message: "Update privacy and policy error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete privacy and policy error",
      success: false,
    };
  }
}
