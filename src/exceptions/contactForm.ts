import { FormStateType } from "@/types/response";
import { exception } from "./common";

export class contactFormException extends exception {
  static createFail(): FormStateType {
    return {
      code: 400,
      message: "Create contact form failed",
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
      message: "Update contact form error",
      success: false,
    };
  }

  static deleteFail(): FormStateType {
    return {
      code: 422,
      message: "Delete contact form error",
      success: false,
    };
  }
}
