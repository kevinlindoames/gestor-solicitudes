export interface ApiResponse<TData> {
  data: TData;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
}