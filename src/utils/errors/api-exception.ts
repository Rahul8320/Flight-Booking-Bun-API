export class ApiExecption extends Error {
  public error: Error;

  constructor(message: string, error: Error) {
    super(message);
    this.error = error;
  }
}
