export class ApiResponse {
  public success: boolean;
  public message: string;
  public data: any;
  public error: any;

  constructor(success: boolean, message: string, data: any, error: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export class ApiSuccessResponse extends ApiResponse {
  constructor(message: string, data: any) {
    super(true, message, data, null);
  }
}

export interface IValidationData {
  field: string;
  message: string;
}

export class ApiFailureResponse extends ApiResponse {
  constructor(message: string, error: string | IValidationData[]) {
    super(false, message, null, error);
  }
}
