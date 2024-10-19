export type APIResponse<result> = {
  status: number;
  message: string;
  result: result;
};

export type FormStateType<T = null> = {
  code: number;
  message: string;
  success: boolean;
  result?: T
};
