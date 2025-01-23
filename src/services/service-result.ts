import type { IValidationData } from "../utils";

export class ServiceResult<T> {
  public statusCode: number;

  constructor(statusCode: number) {
    this.statusCode = statusCode;
  }
}

export class ServiceSuccessResult<T> extends ServiceResult<T> {
  public data: T | null;

  constructor(statusCode: number, data: T | null = null) {
    super(statusCode);
    this.data = data;
  }
}

export class ServiceValidationErrorResult extends ServiceResult<any> {
  public validationErrors: IValidationData[];

  constructor(statusCode: number, validationErrors: IValidationData[]) {
    super(statusCode);
    this.validationErrors = validationErrors;
  }
}
